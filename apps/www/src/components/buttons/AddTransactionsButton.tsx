"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPopulateTransactions } from "@/actions/create-populate-transactions";
import { toast } from "sonner";

import { Button } from "@dingify/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dingify/ui/components/dialog";

export function AddTransactionsButton({ bankAccountId }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await createPopulateTransactions(bankAccountId);

    if (response.success) {
      toast.success("Transactions have been added successfully.");
      router.refresh(); // Refresh the page to show new transactions
    } else {
      console.error(response.error);
      toast.error("There was an error adding transactions.");
    }

    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" disabled={isLoading}>
          Add Sample Transactions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Sample Transactions</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Transactions"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
