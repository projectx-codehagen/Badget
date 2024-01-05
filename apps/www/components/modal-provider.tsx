"use client";

import { SignInModal } from "@/apps/www/components/layout/sign-in-modal";
import { useMounted } from "@/apps/www/hooks/use-mounted";

import { LanguageModal } from "./layout/language-modal";

export const ModalProvider = () => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SignInModal />
      <LanguageModal />
      {/* add your own modals here... */}
    </>
  );
};
