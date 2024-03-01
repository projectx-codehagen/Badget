"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

export function GetStartedButton() {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const handleOnClick = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  };

  return (
    <Button
      className={cn(buttonVariants({ size: "lg" }))}
      onClick={handleOnClick}
    >
      Get started
    </Button>
  );
}
