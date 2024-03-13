import type { FC, ReactNode } from "react";

import { DialogFooter } from "@/components/ui/dialog";

interface StepFooterProps {
  show: boolean;
  children?: ReactNode;
}

export const Footer: FC<StepFooterProps> = ({ show, children }) => {
  if (!show) {
    return null;
  }

  return <DialogFooter className="mt-6">{children}</DialogFooter>;
};
