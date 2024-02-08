import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UploadDropZone } from "../fileupload/UploadDropZone";

// @ts-ignore
export function AddFilesButton({ propertyId, slug }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload</Button>
      </DialogTrigger>
      <DialogContent className="grid max-h-[100%] justify-center max-sm:px-0 md:w-fit">
        <DialogHeader>
          <DialogTitle>Upload your files</DialogTitle>
          <DialogDescription>
            Upload all your photos for your property
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <UploadDropZone slug={slug} propertyId={propertyId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
