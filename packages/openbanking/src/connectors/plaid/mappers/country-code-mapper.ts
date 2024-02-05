import { CountryCode } from "plaid";

import { CountryCode as CanonicalCountryCode } from "@projectx/db";

export const toCanonicalCountryCode = (countryCode: CountryCode) => {
  switch (countryCode) {
    case CountryCode.It:
      return CanonicalCountryCode.IT;
    case CountryCode.Us:
      return CanonicalCountryCode.US;
    default:
      throw new Error(`[plaid] unknown country code ${countryCode}`);
  }
};

export const toPlaidCountryCode = (countryCode: CanonicalCountryCode) => {
  switch (countryCode) {
    case CanonicalCountryCode.IT:
      return CountryCode.It;
    case CanonicalCountryCode.US:
      return CountryCode.Us;
    default:
      throw new Error(`[plaid] unknown country code ${countryCode}`);
  }
};
