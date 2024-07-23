"use client";

import * as React from "react";

import { Button } from "@dingify/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dingify/ui/components/dialog";

import { cn } from "@/lib/utils";

import CSVParser from "./generic-csv-parser";

export function CSVUploader() {
  const [open, setOpen] = React.useState(false);

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
        <UploadForm />
      </DialogContent>
    </Dialog>
  );
}

function UploadForm({ className }: { className?: string }) {
  return (
    <div className={cn("items-center py-4", className)}>
      <CSVParser />
    </div>
  );
}
