"use client";

import type { FC, ReactNode } from "react";

import { Button } from "@dingify/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@dingify/ui/components/dialog";

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
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
};
