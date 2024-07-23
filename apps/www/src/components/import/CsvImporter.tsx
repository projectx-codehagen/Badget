"use client";

import * as React from "react";

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

import { cn } from "@/lib/utils";

import CSVParser from "./generic-csv-parser";

export function CSVUploader({ bankAccountId }: { bankAccountId: string }) {
  const [open, setOpen] = React.useState(false);

  const handleTestFileImport = () => {
    // Logic for importing a test file can be placed here
    console.log("Test file import initiated");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Import File</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Import File</DialogTitle>
          <DialogDescription>
            Export transactions data as a file from bank's website.
          </DialogDescription>
        </DialogHeader>
        <UploadForm bankAccountId={bankAccountId} />
        <DialogFooter>
          <Button onClick={handleTestFileImport}>Import Test File</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function UploadForm({
  className,
  bankAccountId,
}: {
  className?: string;
  bankAccountId: string;
}) {
  return (
    <div className={cn("items-center py-4", className)}>
      <CSVParser bankAccountId={bankAccountId} />
    </div>
  );
}
