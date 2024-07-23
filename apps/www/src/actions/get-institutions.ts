"use server";

import fetch from "node-fetch"; // Import node-fetch for making HTTP requests

import { getCurrentUser } from "@/lib/session";

import { getAccessToken, initializeTokens } from "./gocardless/accsessToken";

export async function getInstitutions(countryCode: string): Promise<string> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  console.log("User authenticated:", user);

  const secretId = process.env.GOCARDLESS_SECRET_ID;
  const secretKey = process.env.GOCARDLESS_SECRET_KEY;
  console.log("Secret ID:", secretId);
  console.log("Secret Key:", secretKey);

  try {
    const tokenResponse = await fetch(
      "https://bankaccountdata.gocardless.com/api/v2/token/new/",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret_id: secretId,
          secret_key: secretKey,
        }),
      },
    );

    console.log("Token response status:", tokenResponse.status);

    if (!tokenResponse.ok) {
      throw new Error("Failed to fetch token");
    }

    const tokenData = await tokenResponse.json();
    console.log("Token response data:", tokenData);

    // Ensure the access token is correctly returned
    return tokenData.access;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw new Error("Failed to fetch token");
  }
}

export async function getBanks(countryCode: string) {
  try {
    console.log("Fetching access token for country code:", countryCode);
    const accessToken = await getAccessToken();
    console.log("Access Token:", accessToken); // Log the access token

    const banksResponse = await fetch(
      `https://bankaccountdata.gocardless.com/api/v2/institutions/?country=${countryCode}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log("Banks response status:", banksResponse.status);

    if (!banksResponse.ok) {
      throw new Error("Failed to fetch banks");
    }

    const banksData = await banksResponse.json();
    console.log("Banks response data:", banksData);
    return banksData;
  } catch (error) {
    console.error("Error fetching banks:", error);
    throw new Error("Failed to fetch banks");
  }
}

// Initialize tokens when the application starts
initializeTokens().catch((error) => {
  console.error("Failed to initialize tokens:", error);
});
