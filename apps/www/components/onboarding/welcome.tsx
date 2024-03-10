import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { STAGGER_CHILD_VARIANTS } from "./onboarding-constants";
import { BackgroundBeams } from "./beams";

export default function Welcome() {
  const router = useRouter();
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <motion.div
      className="z-10"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <motion.div
        variants={{
          show: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="mx-5 flex flex-col items-center space-y-10 text-center sm:mx-auto  z-10"
      >
        <motion.h1
          className="font-display text-4xl font-bold text-foreground transition-colors sm:text-5xl"
          variants={STAGGER_CHILD_VARIANTS}
        >
          Welcome to{" "}
          <span className="font-bold tracking-tighter">Badget</span>
        </motion.h1>
        <motion.p
          className="max-w-md text-accent-foreground/80 transition-colors sm:text-lg"
          variants={STAGGER_CHILD_VARIANTS}
        >
          Badget gives you the power to securely track your finances using AI, enabling smarter decisions.
        </motion.p>
        <motion.div
          variants={STAGGER_CHILD_VARIANTS}
          className=" z-10"
        >
          <Button
            className="px-10 font-bold text-base text-white z-10"
            onClick={() =>
              router.push("/onboarding" + "?" + createQueryString("step", "financial-goals"))
            }
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>
      <BackgroundBeams />
    </motion.div>
  );
}
