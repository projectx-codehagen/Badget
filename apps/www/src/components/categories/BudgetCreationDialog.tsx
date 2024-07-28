"use client";

import { useEffect, useState } from "react";
import { calculateSuggestedBudget } from "@/actions/calculate-suggested-budget";
import { createBudget } from "@/actions/create-budget";
import { getCategoriesReview } from "@/actions/get-categories-review";
import { updateBudget } from "@/actions/update-budget";
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

interface Budget {
  id: string;
  name: string | null;
  startDate: Date | null;
  endDate: Date | null;
  categories: {
    id: string;
    budget: number;
  }[];
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

interface BudgetDialogProps {
  existingBudget?: Budget;
  children: React.ReactNode;
}

export function BudgetDialog({ existingBudget, children }: BudgetDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      budgetName: existingBudget?.name ?? "",
      categories: {},
    },
  });

  useEffect(() => {
    if (isOpen && categories.length === 0) {
      setIsLoading(true);
      getCategoriesReview()
        .then((fetchedCategories) => {
          setCategories(fetchedCategories);
          const categoryValues = fetchedCategories.reduce(
            (acc, category) => {
              const existingCategory = existingBudget?.categories.find(
                (c) => c.id === category.id,
              );
              acc[category.id] = existingCategory?.budget ?? 0;
              return acc;
            },
            {} as Record<string, number>,
          );

          form.reset({
            budgetName: existingBudget?.name ?? "",
            categories: categoryValues,
          });
        })
        .catch((error) => {
          console.error("Failed to fetch categories:", error);
          toast.error("Failed to fetch categories. Please try again.");
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, categories.length, form, existingBudget]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      let result;
      if (existingBudget) {
        result = await updateBudget({ ...data, id: existingBudget.id });
      } else {
        result = await createBudget(data);
      }

      if (result.success) {
        toast.success(
          existingBudget
            ? "Budget updated successfully!"
            : "Budget created successfully!",
        );
        setIsOpen(false);
      } else {
        toast.error(
          result.error ??
            `Failed to ${existingBudget ? "update" : "create"} budget. Please try again.`,
        );
      }
    } catch (error) {
      console.error(
        `Error ${existingBudget ? "updating" : "creating"} budget:`,
        error,
      );
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutomaticBudget = async () => {
    setIsCalculating(true);
    try {
      const suggestedBudget = await calculateSuggestedBudget();
      const categoryBudgets = suggestedBudget.reduce(
        (acc, category) => {
          acc[category.id] = category.suggestedAmount;
          return acc;
        },
        {} as Record<string, number>,
      );

      form.setValue("categories", categoryBudgets);
      toast.success("Automatic budget calculated and applied!");
    } catch (error) {
      console.error("Error calculating automatic budget:", error);
      toast.error("Failed to calculate automatic budget. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {existingBudget ? "Edit Budget" : "Create New Budget"}
          </DialogTitle>
          <DialogDescription>
            {existingBudget
              ? "Modify your existing budget."
              : "Set up your budget based on your categories."}
          </DialogDescription>
        </DialogHeader>
        <div className="mb-4 text-sm text-gray-500">
          <p className="mt-2">
            The automatic budget will analyze your transactions from the last
            month and suggest budget amounts for each category based on your
            spending habits.
          </p>
        </div>
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
              <Button
                type="button"
                variant="outline"
                onClick={handleAutomaticBudget}
                disabled={isCalculating}
              >
                {isCalculating ? "Calculating..." : "Automatic Budget"}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? existingBudget
                    ? "Updating..."
                    : "Creating..."
                  : existingBudget
                    ? "Update Budget"
                    : "Create Budget"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
