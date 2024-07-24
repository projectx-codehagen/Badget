"use server";

import {
  getAccountBalances,
  getAccountDetails,
  getTransactions,
} from "@/sdk/gocardless";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function importBankAccounts(selectedAccounts: string[]) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const results = [];

  for (const accountId of selectedAccounts) {
    try {
      // Fetch account details, balances, and transactions from GoCardless
      const accountDetails = await getAccountDetails(accountId);
      const balancesData = await getAccountBalances(accountId);
      const transactionsData = await getTransactions(accountId);

      // Create or update the currency
      await prisma.currency.upsert({
        where: { iso: accountDetails.currency },
        update: {},
        create: {
          iso: accountDetails.currency,
          symbol: getCurrencySymbol(accountDetails.currency),
        },
      });

      // Create the bank account
      const bankAccount = await prisma.bankAccount.create({
        data: {
          userId: user.id,
          name: accountDetails.name || `Account ${accountDetails.iban}`,
          iban: accountDetails.iban,
          originalPayload: accountDetails,
          accountType: "BANK",
        },
      });

      // Create balance entries
      for (const balance of balancesData.balances) {
        await prisma.balance.create({
          data: {
            accountId: bankAccount.id,
            currencyIso: accountDetails.currency,
            amount: Math.round(parseFloat(balance.balanceAmount.amount) * 100), // Convert to cents
            date: new Date(balance.referenceDate),
            type: mapBalanceType(balance.balanceType),
            originalPayload: balance,
          },
        });
      }

      // Fetch existing categories
      const categories = await prisma.category.findMany({
        where: { userId: user.id },
      });

      const categoryMap = categories.reduce((acc, category) => {
        acc[category.name] = category.id;
        return acc;
      }, {});

      // Process and import transactions
      const transactions = transactionsData.transactions
        .slice(0, 10) // Take only the first 10 transactions
        .map((transaction) => ({
          accountId: bankAccount.id,
          currencyIso: accountDetails.currency,
          amount: Math.round(
            parseFloat(transaction.transactionAmount.amount) * 100,
          ), // Convert to cents
          date: new Date(transaction.bookingDate),
          description:
            transaction.remittanceInformationUnstructured ||
            "Unknown transaction",
          categoryId: getCategoryId(transaction, categoryMap),
          originalPayload: transaction,
          review: false,
        }));

      await prisma.transaction.createMany({
        data: transactions,
      });

      results.push({ accountId, success: true });
    } catch (error) {
      console.error(`Error importing account ${accountId}:`, error);
      results.push({ accountId, success: false, error: error.message });
    }
  }

  return results;
}

function getCurrencySymbol(currencyIso: string): string {
  const symbolMap = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    NOK: "kr",
    // Add more currencies as needed
  };
  return symbolMap[currencyIso] || currencyIso;
}

function mapBalanceType(
  balanceType: string,
): "AVAILABLE" | "BOOKED" | "EXPECTED" {
  switch (balanceType.toLowerCase()) {
    case "interimavailable":
    case "available":
      return "AVAILABLE";
    case "interimbooked":
    case "closingbooked":
    case "booked":
      return "BOOKED";
    case "expected":
      return "EXPECTED";
    default:
      return "BOOKED"; // Default to BOOKED if unknown
  }
}

function getCategoryId(
  transaction: any,
  categoryMap: Record<string, string>,
): string | null {
  const description =
    transaction.remittanceInformationUnstructured?.toLowerCase() || "";
  if (description.includes("grocery") || description.includes("supermarket")) {
    return categoryMap["Groceries"] || null;
  }
  if (description.includes("restaurant") || description.includes("cafe")) {
    return categoryMap["Restaurants"] || null;
  }
  // Add more category mappings as needed
  return null; // Return null if no category is matched
}
