"use client";

import { useCallback, useState, useEffect, type ReactNode } from "react";

export interface FlowStep {
  id: number;
  title?: string;
  description?: string;
  component: ReactNode;
}

export interface UseFlowControlProps {
  // steps is an array of FlowStep objects
  steps: FlowStep[];
  // initialStep is the id of the first step
  initialStep?: number;
  // onStepChange (event) is a function that is called when the current step changes
  onStepChange?: (newStepId: number) => void;
  // onFlowComplete (event) is a function that is called when the flow is complete
  onFlowComplete?: () => void;
}

export function useFlowControl({
  steps,
  initialStep = 0,
  onStepChange,
  onFlowComplete,
}: UseFlowControlProps) {
  const [currentStepId, setCurrentStepId] = useState<number>(initialStep);
  const [isFlowComplete, setIsFlowComplete] = useState<boolean>(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const goToNextStep = useCallback(() => {
    const nextStepIndex = currentStepId + 1;
    const nextStepId = steps[nextStepIndex]?.id;
    if (nextStepIndex < steps.length && nextStepId !== undefined) {
      setCurrentStepId(nextStepId);
      onStepChange?.(nextStepId);
    }
  }, [steps, currentStepId, onStepChange]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const goToPreviousStep = useCallback(() => {
    const prevStepIndex = currentStepId - 1;
    const prevStepId = steps[prevStepIndex]?.id;
    if (prevStepIndex >= 0 && prevStepId !== undefined) {
      setCurrentStepId(prevStepId);
      onStepChange?.(prevStepId);
    }
  }, [steps, currentStepId, onStepChange]);

  const setCurrentStep = (stepId: number) => {
    setCurrentStepId(stepId);
    onStepChange?.(stepId);
  };

  const resetFlow = () => {
    setCurrentStepId(initialStep);
    setIsFlowComplete(false);
  };

  const completeFlow = () => setIsFlowComplete(true);

  useEffect(() => {
    if (isFlowComplete) {
      onFlowComplete?.();
    }
  }, [isFlowComplete, onFlowComplete]);

  return {
    currentStepId,
    isFlowComplete,
    goToNextStep,
    goToPreviousStep,
    setCurrentStep,
    resetFlow,
    completeFlow,
  };
}

export type UseFlowControlReturn = ReturnType<typeof useFlowControl>;
