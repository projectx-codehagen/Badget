"use client";

// Error components must be Client Components
import { useEffect } from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mt-5 space-y-4 text-center">
      <h2 className="font-bold">Something went wrong!</h2>
      <div>We will look into this and resolve it as soon as possible</div>
      <button
        type="submit"
        className={cn(buttonVariants())}
        onClick={() => reset()}
      >
        Retry
      </button>
    </div>
  );
}
