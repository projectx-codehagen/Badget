"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <SignIn
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
        }}
      />
    </div>
  );
}
