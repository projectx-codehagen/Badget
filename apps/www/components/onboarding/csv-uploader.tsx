import * as React from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import CSVParser from "./generic-csv-parser";
import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/use-media-query";

export function CSVUploader() {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery().isMobile;

	if (!isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>Import File</Button>
				</DialogTrigger>
				<DialogContent className="h-screen max-w-screen-2xl">
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

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button>Import File</Button>
			</DrawerTrigger>
			<DrawerContent className="px-4 pb-4">
				<p className="p-48">
					Badget does not currently support file import from mobile screens.
					<br />
					<br />
					Please use Badget desktop.
				</p>
			</DrawerContent>
		</Drawer>
	);
}

function UploadForm({
	className,
}: {
	className?: string;
}) {
	return (
		<div className={cn("items-center py-4", className)}>
			<CSVParser />
		</div>
	);
}
