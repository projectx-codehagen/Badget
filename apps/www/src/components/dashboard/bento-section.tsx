"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";

import { AnimatedBeam } from "../animate-beam";
import { Icons } from "../shared/icons";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

export function BentoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);

  return (
    <section id="pricing">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* <h4 className="text-xl font-bold tracking-tight text-black dark:text-white">
            Pricing
          </h4> */}

          <h2 className="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
            Easy to integrate
          </h2>

          <p className="mt-6 text-xl leading-8 text-black/80 dark:text-white">
            Choose an <strong>affordable plan</strong> that&apos;s packed with
            the best features for engaging your audience, creating customer
            loyalty, and driving sales.
          </p>
        </div>
      </div>

      <div className="container mb-14 mt-8 flex items-center justify-center px-4 md:px-6">
        {" "}
        {/* Reduced margins */}
        <div
          className="relative flex w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl"
          ref={containerRef}
        >
          <div className="flex h-full w-full flex-col items-stretch justify-between gap-10">
            <div className="flex flex-row justify-between">
              <Circle ref={div1Ref}>
                <Icons.user className="text-black" />
              </Circle>
              <Circle ref={div2Ref}>
                <Icons.logo className="h-6 w-6" />
              </Circle>
            </div>
          </div>

          <AnimatedBeam
            duration={3}
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div2Ref}
          />
        </div>
      </div>
    </section>
  );
}
