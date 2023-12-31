import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UploadDropZone } from "../fileupload/UploadDropZone"

export function AddFilesButton({propertyId, slug}) {

  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">Upload</Button>
    </DialogTrigger>
    <DialogContent className="md:w-fit grid justify-center max-h-[100%] max-sm:px-0">
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
  )
}
