"use client";

import { useEffect } from "react";
import { useOnborda } from "onborda";

import { Button } from "@dingify/ui/components/button";

export function StartOnbordaButton() {
  const { startOnborda } = useOnborda();
  const handleStartOnborda = () => {
    startOnborda();
  };

  return (
    <Button onClick={handleStartOnborda} variant="outline" size="lg">
      Start Onborda 🚀
    </Button>
  );
}
