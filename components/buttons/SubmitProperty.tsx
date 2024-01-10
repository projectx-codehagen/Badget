import Link from "next/link";

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

export function SubmitProperty() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Submit Property</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Do you want to submit your property?</DialogTitle>
          <DialogDescription>
            Lets send this to your provider (Finn.no)
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Link href="/property" passHref>
            <Button type="submit">Save new property</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
