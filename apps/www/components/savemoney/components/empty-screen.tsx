// import { UseChatHelpers } from "ai/react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const exampleMessages = [
  {
    heading: "Budget Planning",
    message: `Help me create a budget plan for the next month.`,
  },
  {
    heading: "Expense Tracking",
    message: "How do I track my daily expenses and categorize them?",
  },
  {
    heading: "Saving Tips",
    message: `Based on my spending habits, how can i save more money?.`,
  },
];

//TODO - Maybe do this  export function EmptyScreen({ setInput }: Pick<UseChatHelpers, "setInput">) {

export function EmptyScreen() {
  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Welcome to Badget Magic ✨</CardTitle>
        <CardDescription>
          Dive into smart financial management with Badget! We are here to help
          you navigate your finances with ease. From budgeting to saving, ask
          away or try these examples:
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start space-y-2">
        {exampleMessages.map((message, index) => (
          <Button
            key={index}
            variant="link"
            className="h-auto p-0 text-base"
            // onClick={() => setInput(message.message)}
          >
            <ArrowRight className="mr-2 text-muted-foreground" />
            {message.heading}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
