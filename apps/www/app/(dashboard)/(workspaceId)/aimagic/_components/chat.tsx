"use client";

import { useState, type ComponentProps } from "react";
import { useUIState } from "ai/rsc";

import { cn } from "@/lib/utils";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";

import type { Message } from "../types";
import ChatPanel from "./chat-panel";
import IntroSection from "./intro-section";
import { MessageList } from "./message-list";

export interface ChatProps extends ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
}

const Chat = (props: ChatProps) => {
  const { className } = props;

  const [input, setInput] = useState<string>("");
  const [messages] = useUIState();
  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();
  return (
    <div className="group w-full overflow-auto" ref={scrollRef}>
      <div
        className={cn("pb-[200px] pt-4 md:pt-10", className)}
        ref={messagesRef}
      >
        {messages.length === 0 ? (
          <IntroSection />
        ) : (
          <div className={cn("pb-[200px] pt-4 md:pt-10")}>
            <MessageList messages={messages} />
          </div>
        )}
        <div className="h-px w-full" ref={visibilityRef} />
      </div>
      <ChatPanel
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
};

export default Chat;
