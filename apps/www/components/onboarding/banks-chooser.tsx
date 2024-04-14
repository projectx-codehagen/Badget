"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Landmark } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"
import banks from "./banks-data/banks-list"

export function BanksChooser({ onSelect }: { onSelect: (value: string) => void }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? banks.find((bank) => bank.value === value)?.label
            : "Select bank..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search for bank..." />
          <CommandEmpty>
            Bank not found <br />
            Please raise an issue on GitHub
          </CommandEmpty>
          <CommandGroup>
            {banks.map((bank) => (
              <CommandItem
                key={bank.value}
                value={bank.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  onSelect(bank.label);
                }}
                className="h-16 pr-6"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === bank.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex items-center">
                  {/* TODO: Add images instead of just the icon */}
                  <Landmark />
                  <div className="ml-6">{bank.label}</div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
