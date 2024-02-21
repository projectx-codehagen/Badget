"use client";

import * as React from "react";
import {
  Building,
  Car,
  Circle,
  CreditCard,
  Film,
  Home,
  Shirt,
  ShoppingCart,
  Truck,
  Zap,
} from "lucide-react";

import { useMediaQueryShadcn } from "@/hooks/use-media-query-shadcn";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Status = {
  value: string;
  label: string;
};

//TODO Map icons to the left of text
const labelToIconMap = {
  Car: <Car />,
  Clothing: <Shirt />,
  Entertainment: <Film />,
  Groceries: <ShoppingCart />,
  Other: <Circle />,
  Rent: <Home />,
  Restaurants: <Building />,
  Shops: <Building />,
  Subscriptions: <CreditCard />,
  Transportation: <Truck />,
  Utilities: <Zap />,
  // Add other mappings as needed
};

const statuses: Status[] = [
  {
    value: "car",
    label: "Car",
  },
  {
    value: "clothing",
    label: "Clothing",
  },
  {
    value: "entertainment",
    label: "Entertainment",
  },
  {
    value: "groceries",
    label: "Groceries",
  },
  {
    value: "other",
    label: "Other",
  },
  {
    value: "rent",
    label: "Rent",
  },
  {
    value: "restaurants",
    label: "Restaurants",
  },
  {
    value: "shops",
    label: "Shops",
  },
  {
    value: "subscriptions",
    label: "Subscriptions",
  },
  {
    value: "transportation",
    label: "Transportation",
  },
  {
    value: "utilities",
    label: "Utilities",
  },
];

export function PopoverBadgeTransaction() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQueryShadcn("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null,
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className=" justify-start">
            {selectedStatus ? (
              <>{selectedStatus.label}</>
            ) : (
              <>+ Select Category</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter categories..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statuses.find((priority) => priority.value === value) || null,
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
