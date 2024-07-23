"use client";

import "react-csv-importer/dist/index.css";

import React, { use, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { importTransactions } from "@/actions/import-transactions"; // Import the server action
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
    const formattedRows = rows.map((row) => ({
      date: row.date,
      description: row.description,
      amount: parseFloat(row.amount),
    }));
    const result = await importTransactions(bankAccountId, formattedRows);
    if (result.success) {
      toast.success("Transactions imported successfully!");
      router.push(
        "/dashboard/banking/" + "?" + createQueryString("step", "done"),
      );
    } else {
      toast.error("Failed to import transactions: " + result.error);
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
