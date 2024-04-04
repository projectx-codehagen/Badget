import { use } from "react";
import { api } from "@/trpc/client";
import { formatDistanceToNow } from "date-fns";
import addDays from "date-fns/addDays";
import addHours from "date-fns/addHours";
import format from "date-fns/format";
import nextSaturday from "date-fns/nextSaturday";
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react";
import {
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

import { formatCurrency } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddButton } from "@/components/buttons/AddButton";
import AddTransactionModal from "@/components/modals/add-transaction";

import { Account } from "../data";
import { AccountsReviewTable } from "./accounts-review-table";

interface AccountDisplayProps {
  account: Account | null;
}

export function AccountsDisplay({ account }: AccountDisplayProps) {
  const listTransactions = account?.id
    ? use(
        api.transaction.listTransactionsByAccountId.query(
          account?.id.toString(),
        ),
      )
    : [];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!account}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </div>
        <div className="ml-auto flex items-center gap-2"></div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!account}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <AddButton triggerLabel="Add Transaction">
          <AddTransactionModal />
        </AddButton>
      </div>
      <Separator />

      {account ? (
        <div className="flex flex-1 flex-col">
          {/* Top bar with avatar, text, and badge */}
          <div className="flex items-center justify-between p-4">
            {/* Left section with avatar and text */}
            <div className="flex items-center gap-4">
              <Avatar>
                {/* <AvatarImage
                  src="/path-to-your-avatar-image.png"
                  alt={mail.name}
                /> */}
                <AvatarFallback delayMs={600}>
                  {account.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                {/* <p className="text-sm text-gray-500">
                  {formatDistanceToNow(account.date, {
                    addSuffix: true,
                  })}
                </p> */}
                <h1 className="text-xl font-semibold">{account.name}</h1>
              </div>
            </div>

            {/* Right section with badge */}
            {/* {mail.date && (
              <div className="flex flex-col items-end">
                <Badge
                  variant={mail.change >= 0 ? "default" : "destructive"}
                  className="self-end"
                >
                  {mail.change >= 0
                    ? `▲ ${mail.change.toFixed(2)}%`
                    : `▼ ${Math.abs(mail.change).toFixed(2)}%`}
                </Badge>
                <div className="mt-2 flex items-baseline">
                  <span className="text-m font-semibold">
                    {formatCurrency(mail.income as number)}
                  </span>
                  <span className="text-m text-muted-foreground">
                    / {formatCurrency(mail.limit as number)}
                  </span>
                </div>
              </div>
            )} */}
          </div>

          <div className="mx-6 h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                // data={account}
                margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
              >
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const incomeData = payload.find(
                        (p) => p.dataKey === "income",
                      );

                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="flex flex-col">
                            {incomeData && (
                              <div>
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Income{" "}
                                </span>
                                <span className="font-bold">
                                  {formatCurrency(incomeData.value as number)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <Separator className="" />
          <AccountsReviewTable transactions={listTransactions} />
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
