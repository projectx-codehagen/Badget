import { type FC } from "react";
import { ChevronLeft, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

interface HeaderControlsProps {
  currentStepId: number;
  goToPreviousStep: () => void;
}

export const HeaderControls: FC<HeaderControlsProps> = ({
  currentStepId,
  goToPreviousStep,
}) => {
  return (
    <div className="flex items-center justify-between">
      {/* Previous button */}
      {currentStepId > 0 && (
        <Button
          variant="ghost"
          className="absolute left-4 top-4 h-fit w-fit rounded-sm p-0 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          aria-label="Return to previous step"
          onClick={goToPreviousStep}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back To Previous Step</span>
        </Button>
      )}
      {/* Close button */}
      <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </div>
  );
};
