"use server";

import axios from "axios";

// Create an Axios instance for API requests
const apiClient = axios.create({
  baseURL: "https://bankaccountdata.gocardless.com/api/v2",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Token variables
let accessToken: string | null = null;
let refreshToken: string | null = null;
let accessTokenExpiry: number | null = null;
let initializationPromise: Promise<void> | null = null;

/**
 * Get the current access token, refreshing it if necessary.
 * @returns {Promise<string>} The access token.
 * @throws Will throw an error if no valid access token is available.
 */
async function getAccessToken(): Promise<string> {
  if (initializationPromise) {
    await initializationPromise;
  }

  if (accessToken && accessTokenExpiry && Date.now() < accessTokenExpiry) {
    return accessToken;
  }

  if (refreshToken) {
    await refreshAccessToken();
    return accessToken!;
  }

  throw new Error("No valid access token available");
}

async function getAccountDetails(accountId: string) {
  if (!accountId) {
    throw new Error("Account ID is undefined");
  }

  await initializeTokens();
  const token = await getAccessToken();
  const response = await apiClient.get(`/accounts/${accountId}/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.data) {
    throw new Error("Failed to get account details");
  }

  return response.data;
}

/**
 * Refresh the access token using the refresh token.
 * @throws Will throw an error if the refresh token is invalid or the request fails.
 */
async function refreshAccessToken() {
  try {
    const response = await apiClient.post("/token/refresh/", {
      refresh: refreshToken,
    });

    if (!response.data) {
      throw new Error("Failed to refresh access token");
    }

    accessToken = response.data.access;
    accessTokenExpiry = Date.now() + response.data.access_expires * 1000;
    refreshToken = response.data.refresh;
  } catch (error) {
    throw new Error("Failed to refresh access token");
  }
}

/**
 * Initialize the tokens by fetching new ones from the API.
 * @returns {Promise<void>} A promise that resolves when the tokens are initialized.
 * @throws Will throw an error if the request fails.
 */
async function initializeTokens() {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      try {
        const response = await apiClient.post("/token/new/", {
          secret_id: process.env.GOCARDLESS_SECRET_ID,
          secret_key: process.env.GOCARDLESS_SECRET_KEY,
        });

        if (!response.data) {
          throw new Error("Failed to fetch initial tokens");
        }

        accessToken = response.data.access;
        accessTokenExpiry = Date.now() + response.data.access_expires * 1000;
        refreshToken = response.data.refresh;
      } catch (error) {
        throw new Error("Failed to initialize tokens");
      }
    })();
  }

  return initializationPromise;
}

/**
 * Create an end user agreement.
 * @param {string} institutionId - The ID of the institution.
 * @param {number} [maxHistoricalDays=90] - The maximum number of historical days.
 * @param {number} [accessValidForDays=90] - The number of days the access is valid for.
 * @param {string[]} [accessScope=["balances", "details", "transactions"]] - The access scope.
 * @returns {Promise<any>} The response data.
 * @throws Will throw an error if the request fails.
 */
async function createEndUserAgreement(
  institutionId: string,
  maxHistoricalDays = 90,
  accessValidForDays = 90,
  accessScope: string[] = ["balances", "details", "transactions"],
) {
  await initializeTokens();
  const token = await getAccessToken();
  const response = await apiClient.post(
    "/agreements/enduser/",
    {
      institution_id: institutionId,
      max_historical_days: maxHistoricalDays,
      access_valid_for_days: accessValidForDays,
      access_scope: accessScope,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.data) {
    throw new Error("Failed to create end user agreement");
  }

  return response.data;
}

/**
 * Create a requisition.
 * @param {string} institutionId - The ID of the institution.
 * @param {string} redirectUrl - The redirect URL.
 * @param {string} connectorConfigId - The connector configuration ID.
 * @param {string} [agreement] - The agreement ID.
 * @param {string} [userLanguage] - The user language.
 * @returns {Promise<any>} The response data.
 * @throws Will throw an error if the request fails.
 */
async function createRequisition(
  institutionId: string,
  redirectUrl: string,
  connectorConfigId: string,
  agreement?: string,
  userLanguage?: string,
) {
  await initializeTokens();
  const token = await getAccessToken();
  const response = await apiClient.post(
    "/requisitions/",
    {
      institution_id: institutionId,
      redirect: redirectUrl,
      reference: generateRandomString(10),
      agreement,
      user_language: userLanguage,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.data) {
    throw new Error("Failed to create requisition");
  }

  return response.data;
}

/**
 * List accounts for a given requisition.
 * @param {string} requisitionId - The ID of the requisition.
 * @returns {Promise<any>} The response data.
 * @throws Will throw an error if the request fails.
 */
async function listAccounts(requisitionId: string) {
  await initializeTokens();
  const token = await getAccessToken();
  const response = await apiClient.get(`/requisitions/${requisitionId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.data) {
    throw new Error("Failed to list accounts");
  }

  return response.data;
}

/**
 * Get transactions for a given account.
 * @param {string} accountId - The ID of the account.
 * @returns {Promise<any>} The response data.
 * @throws Will throw an error if the request fails.
 */
async function getTransactions(accountId: string) {
  await initializeTokens();
  const token = await getAccessToken();
  const response = await apiClient.get(`/accounts/${accountId}/transactions/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.data) {
    throw new Error("Failed to get transactions");
  }

  return response.data;
}

/**
 * Get banks for a given country.
 * @param {string} countryCode - The country code.
 * @returns {Promise<any>} The response data.
 * @throws Will throw an error if the request fails.
 */
async function getBanks(countryCode: string) {
  await initializeTokens();
  const token = await getAccessToken();
  const response = await apiClient.get(
    `/institutions/?country=${countryCode}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.data) {
    throw new Error("Failed to fetch banks");
  }

  return response.data;
}

async function getAccountBalances(accountId: string) {
  await initializeTokens();
  const token = await getAccessToken();
  const response = await apiClient.get(`/accounts/${accountId}/balances/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.data) {
    throw new Error("Failed to get account balances");
  }

  return response.data;
}

/**
 * Generate a random string of a given length.
 * @param {number} length - The length of the string.
 * @returns {string} The generated string.
 */
function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Export functions for external use
export {
  initializeTokens,
  createEndUserAgreement,
  createRequisition,
  listAccounts,
  getTransactions,
  getAccountDetails,
  getBanks,
  getAccountBalances,
};
