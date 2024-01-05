"use client";

import { Button, buttonVariants } from "@/apps/www/components/ui/button";
import { useSigninModal } from "@/apps/www/hooks/use-signin-modal";
import { cn } from "@/apps/www/lib/utils";

export function GetStartedButton() {
  const signInModal = useSigninModal();

  return (
    <Button
      className={cn(buttonVariants({ size: "lg" }))}
      onClick={signInModal.onOpen}
    >
      Get started
    </Button>
  );
}
