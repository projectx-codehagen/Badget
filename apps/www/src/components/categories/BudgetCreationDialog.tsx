"use client";

import { useEffect, useState } from "react";
import { createBudget } from "@/actions/create-budget";
import { getCategoriesReview } from "@/actions/get-categories-review";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@dingify/ui/components/form";
import { Input } from "@dingify/ui/components/input";

interface Category {
  id: string;
  name: string;
  icon: string;
}

const FormSchema = z.object({
  budgetName: z
    .string()
    .min(2, { message: "Budget name must be at least 2 characters." }),
  categories: z.record(
    z.string(),
    z.number().min(0, { message: "Amount must be 0 or greater" }),
  ),
});

export function BudgetCreationDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      budgetName: "",
      categories: {},
    },
  });

  useEffect(() => {
    if (isOpen && categories.length === 0) {
      setIsLoading(true);
      getCategoriesReview()
        .then((fetchedCategories) => {
          setCategories(fetchedCategories);
          const categoryDefaults = fetchedCategories.reduce(
            (acc, category) => {
              acc[category.id] = 0;
              return acc;
            },
            {} as Record<string, number>,
          );
          form.reset({ ...form.getValues(), categories: categoryDefaults });
        })
        .catch((error) => {
          console.error("Failed to fetch categories:", error);
          toast.error("Failed to fetch categories. Please try again.");
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, categories.length, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await createBudget(data);
      if (result.success) {
        toast.success("Budget created successfully!");
        setIsOpen(false);
      } else {
        toast.error(
          result.error ?? "Failed to create budget. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Budget</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
          <DialogDescription>
            Set up your budget based on your categories.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="budgetName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Monthly Budget" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <p>Loading categories...</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {categories.map((category) => (
                  <FormField
                    key={category.id}
                    control={form.control}
                    name={`categories.${category.id}`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="flex items-center">
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                              className="w-24"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            )}
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Budget"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
