"use client";

import type { FC, ReactNode } from "react";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

interface FlowModalProps {
  triggerLabel: string;
  children: ReactNode;
  showCloseButton?: boolean;
}

export const AddButton: FC<FlowModalProps> = ({
  triggerLabel,
  children,
  showCloseButton = true,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};
