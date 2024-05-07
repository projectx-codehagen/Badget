import { Separator } from "@/components/ui/separator";

import type { UIState } from "../types";

export interface ChatList {
  messages: UIState;
}

export function MessageList({ messages }: ChatList) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto flex max-w-2xl flex-col gap-2 px-4">
      {messages.map((message, index) => (
        <div key={message.id}>
          {message.display}
          {index < messages.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  );
}
