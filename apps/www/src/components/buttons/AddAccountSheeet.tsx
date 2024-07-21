"use client";

import { useState } from "react";
import { createNewAccount } from "@/actions/badget/create-new-account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@dingify/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@dingify/ui/components/form";
import { Input } from "@dingify/ui/components/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@dingify/ui/components/sheet";

// Define the Zod schema for account creation
const createAccountSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

// Type definition for the form data
type CreateAccount = z.infer<typeof createAccountSchema>;

export function AddAccountSheet({ currentPath }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CreateAccount>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateAccount) => {
    setIsLoading(true);
    try {
      const result = await createNewAccount(data);

      if (!result.success) {
        throw new Error(result.error || "Failed to create account.");
      }

      toast.success(`Account "${data.name}" is added.`);
      form.reset();
      setIsOpen(false); // Close the sheet on success
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Add New Account</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Account</SheetTitle>
          <SheetDescription>
            Provide the name for the new account.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                {isLoading ? "Adding..." : "Add Account"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
