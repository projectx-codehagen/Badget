// components/DeleteCustomerDialog.tsx
"use client";

import { useRouter } from "next/navigation";
import { deleteCustomer } from "@/actions/delete-customer";
import { toast } from "sonner";

import { Button } from "@dingify/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dingify/ui/components/dialog";

export function DeleteCustomerDialog({ customerId }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await deleteCustomer(customerId);
      if (result.success) {
        router.refresh();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error("There was an error deleting the customer.");
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            customer and remove their data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
