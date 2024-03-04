import type { FC, ReactNode } from "react";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

interface FlowModalProps {
  triggerLabel: string;
  children: ReactNode;
}

export const AddAssetButton: FC<FlowModalProps> = ({
  triggerLabel,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
