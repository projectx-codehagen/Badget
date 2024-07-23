"use server";

import fetch from "node-fetch";

import { getAccessToken } from "./accsessToken";

export async function createRequisition(
  institutionId: string,
  redirectUrl: string,
  connectorConfigId: string,
  reference?: string,
  agreement?: string,
  userLanguage?: string,
) {
  const accessToken = await getAccessToken();

  const body = {
    institution_id: institutionId,
    redirect: redirectUrl,
    reference,
    agreement,
    user_language: userLanguage,
  };

  console.log("Creating requisition with body:", body);

  try {
    const response = await fetch(
      "https://bankaccountdata.gocardless.com/api/v2/requisitions/",
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
      throw new Error("Failed to create requisition");
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error creating requisition:", error);
    throw error;
  }
}
