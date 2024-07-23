"use client";

import * as React from "react";
import { updateCategory } from "@/actions/update-category";
import { Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@dingify/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@dingify/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@dingify/ui/components/popover";

export function CategoryBadge({ transaction, categories }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(transaction.category?.name || "");

  const handleUpdateCategory = async (transactionId, categoryName) => {
    const response = await updateCategory(transactionId, categoryName);
    if (response.success) {
      toast.success("Category updated successfully");
      setValue(categoryName);
    } else {
      toast.error("Failed to update category");
      console.error(response.error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="px-2 py-1 text-xs">
          {transaction.category?.icon || ""} {value || "Uncategorized"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            {categories.map((category) => (
              <CommandItem
                key={category.name}
                value={category.name}
                onSelect={(currentValue) => {
                  handleUpdateCategory(transaction.id, currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    value === category.name ? "opacity-100" : "opacity-0"
                  }`}
                />
                {category.icon} {category.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
