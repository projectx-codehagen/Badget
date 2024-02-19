import { getAllISOCodes } from "iso-country-currency";

import { CanonicalCountry, CanonicalCurrency } from "..";

const countryData: CanonicalCountry[] = [];
const currencyData: CanonicalCurrency[] = [];

// seed country and currency
getAllISOCodes().forEach((isoCode) => {
  countryData.push({
    active: isoCode.iso === "IT",
    iso: isoCode.iso,
    name: isoCode.countryName,
  });

  currencyData.push({
    numericCode: isoCode.numericCode,
    symbol: isoCode.symbol,
    iso: isoCode.currency,
  });
});

export const countries = countryData;
export const currencies = currencyData;
