import { useRef } from "react";
import { nanoid } from "ai";
import { useActions, useUIState } from "ai/rsc";
import { CornerDownLeft } from "lucide-react";

import { useEnterSubmit } from "@/hooks/use-enter-submit";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { AI } from "../actions";
import { UserMessage } from "./chat-message";

const PromptForm = ({
  input,
  setInput,
}: {
  input: string;
  setInput: (value: string) => void;
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { formRef, onKeyDown } = useEnterSubmit();

  const [_, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();

  return (
    <form
      ref={formRef}
      onSubmit={async (e) => {
        e.preventDefault();

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target.message?.blur();
        }

        const value = input.trim();
        setInput("");
        if (!value) return;

        // Optimistically add user message UI
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <UserMessage>{value}</UserMessage>,
          },
        ]);

        // Submit and get response message
        const responseMessage = await submitUserMessage(value);
        setMessages((currentMessages) => [...currentMessages, responseMessage]);
      }}
    >
      <div className="relative flex max-h-60 w-full grow overflow-hidden sm:rounded-md sm:border">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none border-none px-4 py-[1.3rem] focus-within:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" disabled={input === ""}>
                <CornerDownLeft />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  );
};

export default PromptForm;
