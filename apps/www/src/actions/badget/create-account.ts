// actions/add-account.ts
"use server";

import type { AccountType } from "@prisma/client";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function addAccount(data: {
  name: string;
  currencyIso: string;
  accountType: AccountType;
  amount: number;
}) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Log raw data to be inserted
  console.log("Raw data to be inserted:", data);

  // Validate data and ensure it fits schema
  const validatedData = {
    name: data.name,
    currencyIso: data.currencyIso,
    accountType: data.accountType,
    amount: data.amount,
    originalPayload: {}, // Ensuring originalPayload is an empty object
  };

  // Log validated data
  console.log("Validated Data:", validatedData);

  try {
    const account = await prisma.bankaccount.create({
      data: {
        name: validatedData.name,
        currencyIso: validatedData.currencyIso,
        accountType: validatedData.accountType,
        userId: user.id,
        originalPayload: validatedData.originalPayload, // Ensure it is an empty JSON object
      },
    });

    // Log created account
    console.log("Created account:", account);

    const balance = await prisma.balance.create({
      data: {
        accountId: account.id,
        currencyIso: validatedData.currencyIso,
        amount: validatedData.amount,
        date: new Date(),
        type: "AVAILABLE",
      },
    });

    // Log created balance
    console.log("Created balance:", balance);

    return account;
  } catch (error) {
    // Log the error details
    console.error("Error creating account:", error);
    throw error;
  }
}
