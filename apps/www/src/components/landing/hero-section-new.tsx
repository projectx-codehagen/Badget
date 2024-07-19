"use client";

import { useRef } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useInView } from "framer-motion";

import { Button } from "@dingify/ui/components/button";

import { BorderBeam } from "../ui/border-beam";
import TextShimmer from "../ui/text-shimmer";

export default function HeroSectionNew() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section
      id="hero"
      className="relative mx-auto mt-32 max-w-[80rem] px-6 text-center md:px-8"
    >
      <div className="backdrop-filter-[12px] group inline-flex h-7 translate-y-[-1rem] animate-fade-in items-center justify-between gap-1 rounded-full border border-white/5 bg-white/10 px-3 text-xs text-white opacity-0 transition-all ease-in hover:cursor-pointer hover:bg-white/20 dark:text-black">
        <TextShimmer className="inline-flex items-center justify-center">
          <span>✨ Introducing Magic UI Template</span>{" "}
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </TextShimmer>
      </div>
      <h1 className="translate-y-[-1rem] animate-fade-in text-balance bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl">
        Magic UI is the new way
        <br className="hidden md:block" /> to build landing pages.
      </h1>
      <p className="mb-12 translate-y-[-1rem] animate-fade-in text-balance text-lg tracking-tight text-gray-400 opacity-0 [--animation-delay:400ms] md:text-xl">
        Beautifully designed, animated components and templates built with
        <br className="hidden md:block" /> Tailwind CSS, React, and Framer
        Motion.
      </p>
      <Button className="translate-y-[-1rem] animate-fade-in gap-1 rounded-lg text-white opacity-0 ease-in-out [--animation-delay:600ms] dark:text-black">
        <span>Get Started for free </span>
        <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
      </Button>
      <div
        ref={ref}
        className="relative mt-[8rem] animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]"
      >
        <div
          className={`rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] before:[filter:blur(180px)] ${
            inView ? "before:animate-image-glow" : ""
          }`}
        >
          <BorderBeam
            size={200}
            duration={12}
            delay={11}
            colorFrom="var(--color-one)"
            colorTo="var(--color-two)"
          />

          <img
            src="/hero-dark.png"
            alt="Hero Image"
            className="relative hidden h-full w-full rounded-[inherit] border object-contain dark:block"
          />
          <img
            src="/hero-light.png"
            alt="Hero Image"
            className="relative block h-full w-full  rounded-[inherit] border object-contain dark:hidden"
          />
        </div>
      </div>
    </section>
  );
}
