"use client";

// theme CSS for React CSV Importer
import "react-csv-importer/dist/index.css";

import React, { use, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Importer, ImporterField } from "react-csv-importer";
import { toast } from "sonner";

export default function CSVParser() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div>
      <Importer
        dataHandler={async (rows) => {
          // mock timeout to simulate processing
          await new Promise((resolve) => setTimeout(resolve, 500));
        }}
        chunkSize={10000}
        defaultNoHeader={false}
        restartable={true}
        onStart={({ file, fields }) => {
          console.log("starting import of file", file, "with fields", fields);
        }}
        onComplete={({ file, fields }) => {
          // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
          console.log("finished import of file", file, "with fields", fields);
          toast.success("File imported with success!");
        }}
        onClose={() => {
          router.push(
            "/dashboard/banking/" + "?" + createQueryString("step", "done"),
          );
        }}
      >
        <ImporterField name="date" label="date" />
        <ImporterField name="description" label="description" />
        <ImporterField name="amount" label="amount" />
      </Importer>
    </div>
  );
}
