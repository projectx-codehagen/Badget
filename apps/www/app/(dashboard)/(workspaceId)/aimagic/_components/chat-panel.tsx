import { nanoid } from "ai";
import { useActions, useAIState, useUIState } from "ai/rsc";

import type { AI } from "../actions";
import ButtonScrollToBottom from "./button-scroll-to-bottom";
import { UserMessage } from "./chat-message";
import PromptForm from "./prompt-form";

export interface ChatPanelProps {
  id?: string;
  title?: string;
  input: string;
  setInput: (value: string) => void;
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

const ChatPanel = (props: ChatPanelProps) => {
  const { input, setInput, isAtBottom, scrollToBottom } = props;

  const [aiState] = useAIState();
  const [messages, setMessages] = useUIState<typeof AI>();

  const { submitUserMessage } = useActions();

  const exampleMessages = [
    {
      heading: "Budget Planning",
      subheading: "Create a budget plan",
      message: "Help me create a budget plan for the next month.",
    },
    {
      heading: "Expense Tracking",
      subheading: "Track my expenses",
      message: "How do I track my daily expenses and categorize them?",
    },
    {
      heading: "Saving Tips",
      subheading: "Save more money",
      message: "Based on my spending habits, how can i save more money?.",
    },
    {
      heading: "Make me a budget",
      subheading: "Make me a predictive budget",
      message: "Make me a budget table for next month",
    },
  ];

  return (
    <div className="fixed inset-x-0 bottom-12 mx-auto w-full max-w-2xl px-4 sm:px-0">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mb-4 grid grid-cols-2 gap-2">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <div
                key={example.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && "hidden md:block"
                }`}
                onClick={async () => {
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <UserMessage>{example.message}</UserMessage>,
                    },
                  ]);
                  const responseMessage = await submitUserMessage(
                    example.message,
                  );
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ]);
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="border-t bg-background py-2 sm:rounded-t-xl sm:border md:py-4">
        <PromptForm input={input} setInput={setInput} />
      </div>
    </div>
  );
};

export default ChatPanel;
