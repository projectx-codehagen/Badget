"use server";

import fetch from "node-fetch";

import { getAccessToken } from "./accsessToken";

export async function createEndUserAgreement(
  institutionId: string,
  maxHistoricalDays: number = 90,
  accessValidForDays: number = 90,
  accessScope: string[] = ["balances", "details", "transactions"],
) {
  const accessToken = await getAccessToken();

  const body = {
    institution_id: institutionId,
    max_historical_days: maxHistoricalDays,
    access_valid_for_days: accessValidForDays,
    access_scope: accessScope,
  };

  console.log("body", body);

  try {
    const response = await fetch(
      "https://bankaccountdata.gocardless.com/api/v2/agreements/enduser/",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      },
    );

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response text:", errorText);
      throw new Error("Failed to create end user agreement");
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error creating end user agreement:", error);
    throw error;
  }
}
