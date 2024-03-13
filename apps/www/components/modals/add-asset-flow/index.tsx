"use client";

import { useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useFlowControl, type FlowStep } from "@/hooks/use-flow-control";
import { useFlowModalState } from "@/hooks/use-flow-modal-state";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AccountForm } from "@/components/forms/account-form";

import { Footer } from "../parts/footer";
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleSelectAccountType = useCallback(
    (selectedAccountType: AccountTypeInfo) => {
      if (form.formState.dirtyFields.name) {
        form.resetField("name");
      }
      setAccountTypeInfo(selectedAccountType);
      goToNextStep();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const accountFormTitle = accountTypeInfo
    ? `Add ${accountTypeInfo.title}`
    : "Step 2";
  const accountFormDescription = accountTypeInfo
    ? accountTypeInfo.description
    : "Description of Step 2";

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const steps = useMemo<FlowStep[]>(
    () => [
      {
        id: 0,
        title: "Add new account or asset",
        description: "Add the account or asset you want.",
        component: (
          <AccountTypeSelection onSelectAccountType={handleSelectAccountType} />
        ),
      },
      {
        id: 1,
        title: accountFormTitle,
        description: accountFormDescription,
        component: accountTypeInfo ? (
          <AccountForm type={accountTypeInfo.type} />
        ) : null,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleSelectAccountType, accountFormTitle, accountFormDescription],
  );

  const { currentStepId, goToNextStep, goToPreviousStep } = useFlowControl({
    steps,
  });

  const currentStep = useMemo(
    () => steps.find((step) => step.id === currentStepId),
    [steps, currentStepId],
  );

  return (
    <>
      <HeaderControls
        currentStepId={currentStepId}
        goToPreviousStep={() => {
          goToPreviousStep();
        }}
      />
      <DialogHeader>
        <DialogTitle>{currentStep?.title}</DialogTitle>
        <DialogDescription>{currentStep?.description}</DialogDescription>
      </DialogHeader>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepId}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep?.component}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
