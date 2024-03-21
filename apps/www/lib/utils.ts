import { clsx, type ClassValue } from "clsx";
import ms from "ms";
import { twMerge } from "tailwind-merge";

import { env } from "@/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

// Utils from precedent.dev

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export function isValidJSONString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export async function fetchGithubData() {
  try {
    const githubInfoResponse = await fetch(
      "https://api.github.com/repos/projectx-codehagen/badget",
    );
    if (!githubInfoResponse.ok) throw new Error("Failed to fetch GitHub info");
    const data = await githubInfoResponse.json();

    const prsResponse = await fetch(
      "https://api.github.com/search/issues?q=repo:projectx-codehagen/badget+type:pr+is:merged",
    );
    if (!prsResponse.ok) throw new Error("Failed to fetch PRs info");
    const totalPR = await prsResponse.json();

    return {
      stargazers_count: data.stargazers_count,
      open_issues: data.open_issues,
      total_count: totalPR.total_count,
      forks: data.forks,
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    throw error;
  }
}

export const formatNumberWithSpaces = (value: number | string) => {
  if (!value) return value;
  if (typeof value === "string") {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
