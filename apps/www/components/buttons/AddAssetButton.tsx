import {
  Bitcoin,
  Building,
  Car,
  Folder,
  GitGraph,
  Hourglass,
  MoreHorizontal,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export function AddAssetButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new account</DialogTitle>
          <DialogDescription>Add the account type you want.</DialogDescription>
        </DialogHeader>
        <RadioGroup
          defaultValue="realestate"
          className="mb-4 grid grid-cols-3 gap-4"
        >
          <div>
            <RadioGroupItem
              value="realestate"
              id="realestate"
              className="peer sr-only"
            />
            <Label
              htmlFor="realestate"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary"
            >
              <Building className="mb-3 h-6 w-6" />
              Real estate
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="paypal"
              id="paypal"
              className="peer sr-only"
            />
            <Label
              htmlFor="paypal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary"
            >
              <GitGraph className="mb-3 h-6 w-6" />
              Investment
            </Label>
          </div>
          <div>
            <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
            <Label
              htmlFor="apple"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary"
            >
              <Folder className="mb-3 h-6 w-6" />
              Input
            </Label>
          </div>
        </RadioGroup>
        <RadioGroup defaultValue="crypto" className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem
              value="crypto"
              id="crypto"
              className="peer sr-only"
            />
            <Label
              htmlFor="crypto"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary"
            >
              <Wallet className="mb-3 h-6 w-6" />
              Crypto
            </Label>
          </div>
          <div>
            <RadioGroupItem value="car" id="car" className="peer sr-only" />
            <Label
              htmlFor="car"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary"
            >
              <Car className="mb-3 h-6 w-6" />
              Car
            </Label>
          </div>
          <div>
            <RadioGroupItem value="misc" id="misc" className="peer sr-only" />
            <Label
              htmlFor="misc"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary"
            >
              <MoreHorizontal className="mb-3 h-6 w-6" />
              Misc
            </Label>
          </div>
        </RadioGroup>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
