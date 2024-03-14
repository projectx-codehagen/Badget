"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { Toaster } from "@/components/ui/toaster";
import ConnectAccount from "@/components/onboarding/connect-account";
import FinancialGoals from "@/components/onboarding/financial-goals";
import Welcome from "@/components/onboarding/welcome";

export default function Intro() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const step = searchParams.get("step");

  return (
    <div className="dark mx-auto flex h-screen w-screen flex-col items-center justify-center overflow-x-hidden bg-zinc-950 text-white">
      <Toaster />
      <AnimatePresence mode="wait">
        {step ? (
          <button
            className="group absolute left-2 top-10 z-40 rounded-full p-2 transition-all hover:bg-zinc-400 sm:left-10"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-8 w-8 text-zinc-500 group-hover:text-zinc-800 group-active:scale-90" />
          </button>
        ) : (
          <Welcome />
        )}
        {step === "financial-goals" && <FinancialGoals />}
        {step === "connect-accounts" && <ConnectAccount />}
        {step === "done" && (
          <div>
            <h1 className="font-display max-w-md text-3xl font-semibold transition-colors sm:text-4xl">
              Done!
            </h1>
            <Link href="/dashboard" className="rounded-2xl">
              Go to Dashboard
            </Link>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
