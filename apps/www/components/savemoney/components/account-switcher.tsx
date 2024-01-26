"use client";

import * as React from "react";
import { PlusCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface AccountSwitcherProps {
  isCollapsed: boolean;
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  workspace;
}

// Function to render the correct SVG based on the icon string
const IconRenderer = ({ iconName }) => {
  switch (iconName) {
    case "vercel":
      return (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Vercel</title>
          <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
        </svg>
      );
    default:
      return null; // Return null or a default icon
  }
};

//TODO Make modal and aciton to add new workspace
//TODO Make the right checkmark mark the based on what workspace you are on.

export function AccountSwitcher({
  isCollapsed,
  workspace,
}: AccountSwitcherProps) {
  const [selectedAccount, setSelectedAccount] = React.useState<string>(
    workspace.workspaces[0].name,
  );

  return (
    <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden",
        )}
        aria-label="Select workspace"
      >
        <SelectValue placeholder="Select an account">
          {workspace.workspaces.find((ws) => ws.name === selectedAccount) ? (
            <>
              <IconRenderer
                iconName={
                  workspace.workspaces.find((ws) => ws.name === selectedAccount)
                    ?.icon
                }
              />
              <span className={cn("ml-2", isCollapsed && "hidden")}>
                {
                  workspace.workspaces.find((ws) => ws.name === selectedAccount)
                    ?.name
                }
              </span>
            </>
          ) : (
            <span>Select a workspace</span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {workspace.workspaces.map((ws) => (
          <SelectItem key={ws.name} value={ws.name}>
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              <IconRenderer iconName={ws.icon} />
              {ws.workspaceName}
            </div>
          </SelectItem>
        ))}
        <Separator className="my-2" />
        <SelectItem key="add-new" value="add-new">
          <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
            <PlusCircleIcon />
            <span>Add new workspace</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
