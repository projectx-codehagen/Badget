"use server";

import fetch from "node-fetch";

import { getAccessToken } from "./accsessToken";

export async function getTransactions(accountId: string) {
  const accessToken = await getAccessToken();

  try {
    const response = await fetch(
      `https://bankaccountdata.gocardless.com/api/v2/accounts/${accountId}/transactions/`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response text:", errorText);
      throw new Error("Failed to get transactions");
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error getting transactions:", error);
    throw error;
  }
}
