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

export function CSVUploader({
  children,
  bankAccountId,
}: {
  children: React.ReactNode;
  bankAccountId: string;
}) {
  const handleTestFileImport = () => {
    // Create a link element
    const link = document.createElement("a");
    // Set the URL to the test file
    link.href = "/testing.csv";
    // Set the download attribute to trigger download
    link.download = "testing.csv";
    // Append link to the body
    document.body.appendChild(link);
    // Trigger click event on the link
    link.click();
    // Remove link from body
    document.body.removeChild(link);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Import File</DialogTitle>
          <DialogDescription>
            Export transactions data as a file from bank's website.
          </DialogDescription>
        </DialogHeader>
        <UploadForm bankAccountId={bankAccountId} />
        <DialogFooter>
          <Button onClick={handleTestFileImport}>Download Test File</Button>
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
