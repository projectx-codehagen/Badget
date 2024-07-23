"use client";

// theme CSS for React CSV Importer
import "react-csv-importer/dist/index.css";

import React, { use, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { importTransactions } from "@/actions/import-transactions"; // Import your server action
import { Importer, ImporterField } from "react-csv-importer";
import { toast } from "sonner";

export default function CSVParser({
  bankAccountId,
}: {
  bankAccountId: string;
}) {
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

  const handleData = async (rows) => {
    // Import transactions using the server action
    const result = await importTransactions(bankAccountId, rows);
    if (result.success) {
      toast.success("File imported with success!");
    } else {
      toast.error(`Failed to import transactions: ${result.error}`);
    }
  };

  return (
    <div>
      <Importer
        dataHandler={handleData}
        chunkSize={10000}
        defaultNoHeader={false}
        restartable={true}
        onStart={({ file, fields }) => {
          console.log("starting import of file", file, "with fields", fields);
        }}
        onComplete={({ file, fields }) => {
          console.log("finished import of file", file, "with fields", fields);
        }}
        onClose={() => {
          router.push(`/dashboard/banking/${bankAccountId}`);
        }}
      >
        <ImporterField name="date" label="date" />
        <ImporterField name="description" label="description" />
        <ImporterField name="amount" label="amount" />
      </Importer>
    </div>
  );
}
