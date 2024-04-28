import "server-only";

import type { ReactNode } from "react";
import { nanoid } from "ai";
import {
  createAI,
  createStreamableValue,
  getMutableAIState,
  render,
} from "ai/rsc";
import { OpenAI } from "openai";
import { z } from "zod";

import {
  BotCard,
  BotMessage,
  SpinnerMessage,
} from "./_components/chat-message";
import { MonthlySpendingChart } from "./_components/monthly-spending-chart";
import { MonthlySpendingChartSkeleton } from "./_components/monthly-spending-chart-skeleton";
import type { AIState, UIState } from "./types";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const submitUserMessage = async (message: string) => {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  console.log("aiState.get().messages ", aiState.get().messages);

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: "user",
        content: message,
      },
    ],
  });

  let textStream: ReturnType<typeof createStreamableValue<string>> | undefined;
  let textNode: undefined | ReactNode;

  const ui = render({
    model: "gpt-4-turbo",
    provider: openai,
    initial: <SpinnerMessage />,
    messages: [
      {
        role: "system",
        content: `\
You are an AI-driven financial management bot, part of the Badget platform, designed to empower users with advanced insights and tools for stock trading and budget optimization. Your role is to help users make informed decisions about their investments and savings through interactive charts and a user-friendly interface.

Messages inside [] are used to indicate UI elements or user interactions within the Badget platform. These visual cues help you navigate the interface and make informed decisions. For example:
- "[Show Monthly Spending]" will display a detailed interactive chart of the user’s monthly spending.
- "[Adjust Budget to $X]" allows users to set a new budget amount, which is then reflected in their spending chart.

To display the user's monthly spending chart, call \`showMonthlySpendingChart\`.

Besides that, engage in discussions, provide financial insights, and perform calculations as users navigate their financial journeys.`,
      },
      ...aiState.get().messages.map((message) => ({
        role: message.role,
        content: message.content,
        name: message.name,
      })),
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <BotMessage content={textStream.value} />;
      }
      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: "assistant",
              content,
            },
          ],
        });
      } else {
        textStream.update(delta);
      }
      return textNode;
    },
    functions: {
      showMonthlySpendingChart: {
        parameters: z.object({}),
        description:
          "Show the monthly spending chart and allow discussion about it.",
        render: async function* (props) {
          console.log("props", props);
          yield (
            <BotCard>
              <MonthlySpendingChartSkeleton />
            </BotCard>
          );

          await sleep(1000);

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: "function",
                name: "showMonthlySpendingChart",
                content: "Here is your Monthly Spending Chart.",
              },
            ],
          });

          return (
            <BotCard>
              <MonthlySpendingChart />
            </BotCard>
          );
        },
      },
    },
  });

  return {
    id: nanoid(),
    display: ui,
  };
};

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: {
    messages: [],
  },
});
