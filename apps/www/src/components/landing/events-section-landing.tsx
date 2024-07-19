"use client";

import { useRef } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useInView } from "framer-motion";
import { FileInputIcon } from "lucide-react";

import { Button } from "@dingify/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@dingify/ui/components/command";

import { BentoCard } from "../ui/bento-grid";

export default function EventsSectionLanding() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative mx-auto mt-32 max-w-[80rem] px-6 text-center md:px-8">
      <h2 className="translate-y-[-1rem] animate-fade-in text-balance bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl">
        The information you need
        <br className="hidden md:block" /> when you need it.
      </h2>
      <div
        ref={ref}
        className="relative mx-auto mt-20 w-full max-w-[80%] animate-fade-up opacity-0 [--animation-delay:800ms]"
      >
        <BentoCard
          name=""
          className="h-[500px] w-full" // Adjust the height here
          Icon={FileInputIcon}
          description=""
          href="/"
          cta="Learn more"
          background={
            <Command className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>User-123</CommandItem>
                  <CommandItem>Most used events</CommandItem>
                  <CommandItem>Analytics</CommandItem>
                  <CommandItem>All events</CommandItem>
                  <CommandItem>keys.gpg</CommandItem>
                  <CommandItem>seed.txt</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          }
        />
      </div>
      <p className="mb-12 mt-12 translate-y-[-1rem] animate-fade-in text-balance text-lg tracking-tight text-gray-400 opacity-0 [--animation-delay:400ms] md:text-xl">
        Unlock the power of real-time alerts and monitoring
        <br className="hidden md:block" /> Monitor potential issues and
        opportunities
      </p>
    </section>
  );
}
