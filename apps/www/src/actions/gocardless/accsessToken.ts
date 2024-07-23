"use server";

import fetch from "node-fetch";

let accessToken: string | null = null;
let refreshToken: string | null = null;
let accessTokenExpiry: number | null = null;
let initializationPromise: Promise<void> | null = null;

export async function getAccessToken(): Promise<string> {
  console.log("Checking access token...");
  if (initializationPromise) {
    await initializationPromise;
  }

  if (accessToken && accessTokenExpiry && Date.now() < accessTokenExpiry) {
    console.log("Access token is valid:", accessToken);
    return accessToken;
  }

  if (refreshToken) {
    console.log("Access token expired, refreshing...");
    await refreshAccessToken();
    return accessToken!;
  }

  throw new Error("No valid access token available");
}

async function refreshAccessToken() {
  try {
    console.log("Refreshing access token...");
    const response = await fetch(
      "https://bankaccountdata.gocardless.com/api/v2/token/refresh/",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const data = await response.json();
    accessToken = data.access;
    accessTokenExpiry = Date.now() + data.access_expires * 1000;
    refreshToken = data.refresh;
    console.log("Access token refreshed:", accessToken);
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Failed to refresh access token");
  }
}

export async function initializeTokens() {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      try {
        console.log("Initializing tokens...");
        const response = await fetch(
          "https://bankaccountdata.gocardless.com/api/v2/token/new/",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              secret_id: process.env.GOCARDLESS_SECRET_ID,
              secret_key: process.env.GOCARDLESS_SECRET_KEY,
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch initial tokens");
        }

        const data = await response.json();
        accessToken = data.access;
        accessTokenExpiry = Date.now() + data.access_expires * 1000;
        refreshToken = data.refresh;
        console.log("Tokens initialized:", { accessToken, refreshToken });
      } catch (error) {
        console.error("Error initializing tokens:", error);
        throw new Error("Failed to initialize tokens");
      }
    })();
  }

  return initializationPromise;
}
