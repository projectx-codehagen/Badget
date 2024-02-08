"use client";

import { cn } from "@/lib/utils";
import { useLanguageModal } from "@/hooks/use-language-modal";
import { Button, buttonVariants } from "@/components/ui/button";

// @ts-ignore
export function LanugageButton({ userId }) {
  const signInModal = useLanguageModal();

  return (
    <Button
      className={cn(buttonVariants({ size: "lg" }))}
      onClick={signInModal.onOpen}
    >
      Select language
    </Button>
  );
}
