"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { File, MoreVertical, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@dingify/ui/components/badge";
import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@dingify/ui/components/dropdown-menu";
import { Separator } from "@dingify/ui/components/separator";

export default function BankingDashboardDetails({ transaction }) {
  const router = useRouter();

  const handleUserClick = (customerId) => {
    router.push(`dashboard/users/${customerId}`);
  };

  return (
    <>
      <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {transaction?.description}
              <Button
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                size="icon"
                variant="outline"
              >
                <span className="sr-only">Copy Transaction ID</span>
              </Button>
            </CardTitle>
            <CardDescription>
              Date:{" "}
              {transaction?.date
                ? format(new Date(transaction.date), "MM/dd/yyyy")
                : ""}
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 w-8" size="icon" variant="outline">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <File className="mr-2 h-4 w-4" />
                  <span>Export</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={!transaction}>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Transaction Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Description</span>
                <span>{transaction?.description}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span>{transaction?.amount}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Category</span>
                <span>
                  <Badge className="text-xs" variant="default">
                    {transaction?.category?.name || "Uncategorized"}
                  </Badge>
                </span>
              </li>
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Date</span>
                <span>
                  {transaction?.date
                    ? format(new Date(transaction.date), "MM/dd/yyyy")
                    : "N/A"}
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated{" "}
            {transaction?.updatedAt
              ? format(new Date(transaction.updatedAt), "MM/dd/yyyy")
              : "N/A"}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
