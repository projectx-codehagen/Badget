"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

export interface FlowStep {
  id: number;
  title?: string;
  description?: string;
  component: ReactNode;
}

export interface UseFlowControlProps {
  steps: FlowStep[];
  initialStep?: number;
  onStepChange?: (newStepId: number) => void;
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

  const goToNextStep = useCallback(() => {
    const nextStepIndex =
      steps.findIndex((step) => step.id === currentStepId) + 1;
    const nextStepId = steps[nextStepIndex]?.id;
    if (nextStepIndex < steps.length && nextStepId !== undefined) {
      setCurrentStepId(nextStepId);
      onStepChange?.(nextStepId);
    } else {
      setIsFlowComplete(true);
    }
  }, [steps, currentStepId, onStepChange]);

  const goToPreviousStep = useCallback(() => {
    const prevStepIndex =
      steps.findIndex((step) => step.id === currentStepId) - 1;
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
