import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  { value: "chase", label: "Chase" },
  { value: "wells_fargo", label: "Wells Fargo" },
  { value: "bank_of_america", label: "Bank of America" },
  { value: "citi_bank", label: "Citi Bank" },
  { value: "us_bank", label: "US Bank" },
];

function ComboboxDemo({ onFrameworkSelect }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select bank..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search banks..." />
          <CommandEmpty>Bank not found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={() => {
                  setValue(framework.value);
                  setOpen(false);
                  if (onFrameworkSelect) {
                    onFrameworkSelect(framework.value);
                  }
                }}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${value === framework.value ? "opacity-100" : "opacity-0"}`}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function AddNewAccountDialog() {
  const [selectedFramework, setSelectedFramework] = useState("");

  const handleFrameworkSelect = (framework) => {
    setSelectedFramework(framework);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Placeholder</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Bank Integration</DialogTitle>
          <DialogDescription>
            Select the bank you want to connect to ProjectX.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="col-span-4">
            <ComboboxDemo onFrameworkSelect={handleFrameworkSelect} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Select</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
