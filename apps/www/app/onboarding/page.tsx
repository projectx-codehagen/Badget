"use client";

import Welcome from "@/components/onboarding/welcome";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import FinancialGoals from "@/components/onboarding/financial-goals";
import ConnectAccount from "@/components/onboarding/connect-account";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

export default function Intro() {
  const router = useRouter();
  const searchParams = useSearchParams()

  const step = searchParams.get('step')

  return (
    <div className="flex h-screen flex-col items-center justify-center max-w-3xl mx-auto overflow-x-hidden">
      <Toaster />
      <AnimatePresence mode="wait">
        {step ? (
          <button
            className="group absolute left-2 sm:left-10 top-10 z-40 rounded-full p-2 transition-all hover:bg-gray-400"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-8 w-8 text-gray-500 group-hover:text-gray-800 group-active:scale-90" />
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
            <Link href="/dashboard" className="rounded-2xl">Go to Dashboard</Link>
          </div>)}
      </AnimatePresence>
    </div>
  );
}
