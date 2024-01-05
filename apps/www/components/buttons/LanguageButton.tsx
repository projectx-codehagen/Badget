"use client";

import { Button, buttonVariants } from "@/apps/www/components/ui/button";
import { useLanguageModal } from "@/apps/www/hooks/use-language-modal";
import { useSigninModal } from "@/apps/www/hooks/use-signin-modal";
import { cn } from "@/apps/www/lib/utils";

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
