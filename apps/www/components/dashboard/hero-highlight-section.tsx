"use client";

import { motion } from "framer-motion";

import { HeroHighlightComponent, Highlight } from "../ui/hero-highlight";

export function HeroHighlightSection() {
  return (
    <HeroHighlightComponent>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{ opacity: 1, y: 0 }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="mx-auto max-w-4xl px-4 text-center text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-4xl lg:text-5xl lg:leading-snug "
      >
        With Badget,you&apos;re going to save money. Every{" "}
        <Highlight className="text-black dark:text-white">
          day, week, month
        </Highlight>
      </motion.h1>
    </HeroHighlightComponent>
  );
}
