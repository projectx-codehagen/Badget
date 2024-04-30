import Image from "next/image";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import {
  ArrowUpIcon,
  CloudDownload,
  CogIcon,
  FingerprintIcon,
  ServerIcon,
} from "lucide-react";
import { Balancer } from "react-wrap-balancer";

import { BentoGridTemplate } from "./bentogrid/bentogrid";

export default function BentoGridSection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600"></h2>

          <h1
            className="animate-fade-up font-urban text-3xl font-extrabold tracking-tight opacity-0 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>The new</Balancer>
          </h1>

          <h1
            className="relative animate-fade-up bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text font-urban text-3xl font-extrabold tracking-tight text-transparent opacity-0 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>Golden Standard</Balancer>
          </h1>

          <p
            className="mt-4 max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Projectx reimagines financial tracking and optimization with
              leading-edge AI, offering a new era of precision and ease in
              personal finance.
            </Balancer>
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden py-16">
        <BentoGridTemplate />
      </div>
    </div>
  );
}

/////////////////////////////
// If we want to make h1 like framer motion, we can use this code:
// <motion.h1
//   initial={{ opacity: 0, y: 50 }}  // Start with the element 50 pixels down and transparent
//   whileInView={{ opacity: 1, y: 0 }}  // Animate to fully opaque and position y:0
//   transition={{
//     delay: 0.25,  // Delay the start of the animation
//     duration: 0.8,  // Duration of the animation
//     ease: "easeInOut"  // Type of easing
//   }}
//   className="animate-fade-up font-urban text-3xl font-extrabold tracking-tight opacity-0 sm:text-4xl md:text-5xl lg:text-6xl"
//   viewport={{ once: true }}  // Ensures animation only happens once
// >
//   <Balancer>The new</Balancer>
// </motion.h1>

// <motion.h1
//   initial={{ opacity: 0, y: 50 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{
//     delay: 0.25,
//     duration: 0.8,
//     ease: "easeInOut"
//   }}
//   className="relative bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text font-urban text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-6xl"
//   viewport={{ once: true }}
// >
//   <Balancer>Golden Standard</Balancer>
// </motion.h1>
