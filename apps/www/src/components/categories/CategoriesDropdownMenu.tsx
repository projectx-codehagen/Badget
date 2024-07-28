import { File, ListFilter, PlusCircle } from "lucide-react";

import { Button } from "@dingify/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@dingify/ui/components/dropdown-menu";

import { BudgetCreationDialog } from "./BudgetCreationDialog";

export function CategoriesDropdownMenu() {
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
      </DropdownMenu> */}
      <Button size="sm" variant="outline" className="h-8 gap-1">
        <File className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Edit
        </span>
      </Button>
      <Button size="sm" className="h-8 gap-1">
        <PlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Create Budget
        </span>
      </Button>
      {/* <BudgetCreationDialog /> */}
    </div>
  );
}
