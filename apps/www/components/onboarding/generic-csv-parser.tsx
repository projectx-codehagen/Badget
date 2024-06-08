// theme CSS for React CSV Importer
import "react-csv-importer/dist/index.css";

import { Importer, ImporterField } from "react-csv-importer";
import React, { use, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { api } from "@/trpc/client";
import { manualImportSchema } from "@projectx/validators";
import { toast } from "@/components/ui/use-toast";

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

	const upload = async () => {};

	return (
		<div>
			<Importer
				dataHandler={async (rows) => {
					const account_id = await api.account.fetchAll.query();

					for (const row of rows) {
						await api.import.manualImport.mutate({
							import: manualImportSchema.parse(row),
							accountId: account_id[0].id,
						});
					}

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
					toast({
						title: "File imported with success!",
						description: "Your file was imported with success.",
					});
				}}
				onClose={() => {
					router.push("/onboarding" + "?" + createQueryString("step", "done"));
				}}
			>
				<ImporterField name="date" label="date" />
				<ImporterField name="description" label="description" />
				<ImporterField name="amount" label="amount" />
			</Importer>
		</div>
	);
}
