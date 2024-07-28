import { Edit, File, ListFilter, PlusCircle } from "lucide-react";

import { Button } from "@dingify/ui/components/button";

import { BudgetDialog } from "./BudgetCreationDialog";

export interface Budget {
  id: string;
  name: string | null;
  startDate: Date | null;
  endDate: Date | null;
  amount: number;
  categories: {
    id: string;
    name: string;
    icon: string;
    budget: number;
  }[];
}

interface CategoriesDropdownMenuProps {
  budget: Budget | null;
}

export function CategoriesDropdownMenu({
  budget,
}: CategoriesDropdownMenuProps) {
  return (
    <div className="flex items-center gap-2">
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <ListFilter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Filter
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>
            All Categories
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Budgeted</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Unbudgeted</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button size="sm" variant="outline" className="h-8 gap-1">
        <File className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Export
        </span>
      </Button> */}
      <BudgetDialog existingBudget={budget}>
        <Button size="sm" className="h-8 gap-1">
          {budget ? (
            <Edit className="h-3.5 w-3.5" />
          ) : (
            <PlusCircle className="h-3.5 w-3.5" />
          )}
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {budget ? "Edit Budget" : "Create Budget"}
          </span>
        </Button>
      </BudgetDialog>
    </div>
  );
}
