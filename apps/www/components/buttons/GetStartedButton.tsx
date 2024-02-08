"use client";

import { cn } from "@/lib/utils";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { Button, buttonVariants } from "@/components/ui/button";

import {  useUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation'

export function GetStartedButton() {
  const signInModal = useSigninModal();
  const { isSignedIn } = useUser();
  return (
    <Button
      className={cn(buttonVariants({ size: "lg" }))}
      onClick={isSignedIn ? redirect('/dashboard') :signInModal.onOpen}
    >
      Get started
    </Button>
  );
}
