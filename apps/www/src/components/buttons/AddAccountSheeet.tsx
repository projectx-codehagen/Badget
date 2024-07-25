"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewAccount } from "@/actions/create-new-account";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dingify/ui/components/select";
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
  accountType: z.enum(["BANK", "CRYPTO"], {
    required_error: "Account type is required",
  }),
  initialAmount: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().min(0, { message: "Initial amount must be at least 0" }),
  ),
});

// Type definition for the form data
type CreateAccount = z.infer<typeof createAccountSchema>;

export function AddAccountSheet({ children, currentPath }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CreateAccount>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
      accountType: "BANK",
      initialAmount: 0,
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
      router.push(`/dashboard/banking/${result.account?.id}`);
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
        {/* <Button variant="outline">Add New Account</Button> */}
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Account</SheetTitle>
          <SheetDescription>
            Provide the details for the new account.
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
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Account Type</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="BANK">Bank</SelectItem>
                          <SelectItem value="CRYPTO">Crypto</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="initialAmount"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Initial Amount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Initial amount..."
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
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
