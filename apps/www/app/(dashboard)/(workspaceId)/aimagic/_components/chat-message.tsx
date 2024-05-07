"use client";

import type { ReactNode } from "react";
import type { StreamableValue } from "ai/rsc";
import { BotIcon, UserIcon } from "lucide-react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { cn } from "@/lib/utils";
import { useStreamableText } from "@/hooks/use-streamable-text";
import { CodeBlock } from "@/components/ui/codeblock";

import { MemoizedReactMarkdown } from "./markdown";
import { spinner } from "./spinner";

export const UserMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[30px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
        <UserIcon className="h-5 w-5" />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
        {children}
      </div>
    </div>
  );
};

export const BotMessage = ({
  content,
  className,
}: {
  content: string | StreamableValue<string>;
  className?: string;
}) => {
  const text = useStreamableText(content);

  return (
    <div className={cn("group relative flex items-start md:-ml-12", className)}>
      <div className="flex size-[30px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <BotIcon className="h-5 w-5" />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == "▍") {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  );
                }

                children[0] = (children[0] as string).replace("`▍`", "▍");
              }

              const match = /language-(\w+)/.exec(className || "");

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ""}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              );
            },
          }}
        >
          {text}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
};

export const SpinnerMessage = () => {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[30px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <BotIcon className="h-5 w-5" />
      </div>
      <div className="ml-4 flex h-[24px] flex-1 flex-row items-center space-y-2 overflow-hidden px-1">
        {spinner}
      </div>
    </div>
  );
};

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          "flex size-[30px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm",
          !showAvatar && "invisible",
        )}
      >
        <BotIcon className="h-5 w-5" />
      </div>
      <div className="ml-4 flex-1 pl-2">{children}</div>
    </div>
  );
}
