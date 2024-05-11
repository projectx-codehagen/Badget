import { getAllISOCodes } from "iso-country-currency";

import { CanonicalCountry, CanonicalCurrency } from "..";

const isoSet = new Set();
const countryData: CanonicalCountry[] = [];
const currencyIsoSet = new Set();
const currencyData: CanonicalCurrency[] = [];

getAllISOCodes().forEach((isoCode) => {
  if (!isoSet.has(isoCode.iso)) {
    isoSet.add(isoCode.iso);
    countryData.push({
      active: isoCode.iso === "IT",
      iso: isoCode.iso,
      name: isoCode.countryName,
    });
  }

  if (!currencyIsoSet.has(isoCode.currency)) {
    currencyIsoSet.add(isoCode.currency);
    currencyData.push({
      numericCode: isoCode.numericCode,
      symbol: isoCode.symbol,
      iso: isoCode.currency,
    });
  }
});

export const countries = countryData;
export const currencies = currencyData;
