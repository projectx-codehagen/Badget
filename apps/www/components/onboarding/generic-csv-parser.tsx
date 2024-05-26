"use client";

// theme CSS for React CSV Importer
import "react-csv-importer/dist/index.css";

import { Importer, ImporterField } from "react-csv-importer";
import React, { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ReactDOM from "react-dom";

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
					// required, receives a list of parsed objects based on defined fields and user column mapping;
					console.log("Rows processed:", rows);

					// mock timeout to simulate processing
					await new Promise((resolve) => setTimeout(resolve, 500));
				}}
				chunkSize={10000} // optional, internal parsing chunk size in bytes
				defaultNoHeader={false} // optional, keeps "data has headers" checkbox off by default
				restartable={true} // optional, lets user choose to upload another file when import is complete
				onStart={({ file, fields }) => {
					// optional, invoked when user has mapped columns and started import
					console.log("starting import of file", file, "with fields", fields);
				}}
				onComplete={({ file, fields }) => {
					// optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
					console.log("finished import of file", file, "with fields", fields);
				}}
				onClose={() => {
					// optional, invoked when import is done and user clicked "Finish"
					console.log("importer dismissed");
					router.push("/onboarding" + "?" + createQueryString("step", "done"));
				}}
			>
				<ImporterField name="date" label="Date" />
				<ImporterField name="description" label="Description/Name" />
				<ImporterField name="amount" label="Amount" />
			</Importer>
		</div>
	);
}
