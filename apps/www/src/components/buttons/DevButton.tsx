"use client";

import React, { useState } from "react";

import { Button } from "@dingify/ui/components/button";

import { AccountsDialog } from "../modals/AccountsDialog";

export function DevButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button onClick={handleOpenModal}>Open Accounts Modal</Button>
      {isOpen && <AccountsDialog />}
    </>
  );
}
