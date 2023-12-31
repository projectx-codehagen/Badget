"use client";

import { useMounted } from "@/hooks/use-mounted";
import { SignInModal } from "@/components/layout/sign-in-modal";

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
