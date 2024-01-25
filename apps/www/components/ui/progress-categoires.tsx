"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const getColorForPercentage = (value) => {
  if (value > 100) {
    return "bg-red-500"; // Red for over 100%
  } else if (value > 80) {
    return "bg-orange-500"; // Orange for over 80%
  }
  return "bg-primary"; // Default color
};

const ProgressCategories = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const colorClass = getColorForPercentage(value);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={`h-full w-full flex-1 ${colorClass} transition-all`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
ProgressCategories.displayName = ProgressPrimitive.Root.displayName;

export { ProgressCategories };
