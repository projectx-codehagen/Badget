// components/AddAssetFlow.tsx
"use client";

import type { FlowStep } from "@/hooks/use-flow-control";
import { useCallback, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@dingify/ui/components/dialog";

import { useFlowControl } from "@/hooks/use-flow-control";
import { useFlowModalState } from "@/hooks/use-flow-modal-state";
import { AccountForm } from "@/components/forms/account-form";

import { AccountTypeSelection } from "./components/account-type-selection";
import { HeaderControls } from "./components/header-controls";

export type AccountType = "real-estate" | "investment" | "account" | "asset";

export interface AccountTypeInfo {
  type: AccountType;
  title: string;
  description: string;
  value: string;
  label: string;
  Icon: React.ElementType;
}

export const AddAssetFlow = () => {
  const { setAccountTypeInfo, accountTypeInfo, form } = useFlowModalState();

  const steps = useMemo<FlowStep[]>(
    () => [
      {
        id: 0,
        title: "Add new account or asset",
        description: "Add the account or asset you want.",
        component: (
          <AccountTypeSelection
            onSelectAccountType={(selectedAccountType) => {
              console.log("Selected Account Type:", selectedAccountType);
              if (form && form.formState.dirtyFields.name) {
                form.resetField("name");
              }
              setAccountTypeInfo(selectedAccountType);
              goToNextStep();
            }}
          />
        ),
      },
      {
        id: 1,
        title: accountTypeInfo ? `Add ${accountTypeInfo.title}` : "Step 2",
        description: accountTypeInfo
          ? accountTypeInfo.description
          : "Description of Step 2",
        component: accountTypeInfo ? (
          <AccountForm type={accountTypeInfo.type} />
        ) : null,
      },
    ],
    [accountTypeInfo, form, setAccountTypeInfo],
  );

  const { currentStepId, goToNextStep, goToPreviousStep } = useFlowControl({
    steps,
  });

  useEffect(() => {
    console.log("Current Step ID:", currentStepId);
    console.log(
      "Current Step:",
      steps.find((step) => step.id === currentStepId),
    );
  }, [currentStepId, steps]);

  return (
    <>
      <HeaderControls
        currentStepId={currentStepId}
        goToPreviousStep={goToPreviousStep}
      />
      <DialogHeader>
        <DialogTitle>
          {steps.find((step) => step.id === currentStepId)?.title}
        </DialogTitle>
        <DialogDescription>
          {steps.find((step) => step.id === currentStepId)?.description}
        </DialogDescription>
      </DialogHeader>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepId}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {steps.find((step) => step.id === currentStepId)?.component}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
