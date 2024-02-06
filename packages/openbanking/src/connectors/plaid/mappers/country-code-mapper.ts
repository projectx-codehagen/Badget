import { CountryCode } from "plaid";

export const toCanonicalCountryCode = (countryCode: CountryCode) => {
  switch (countryCode) {
    case CountryCode.It:
      return "IT";
    case CountryCode.Us:
      return "US";
    default:
      throw new Error(`[plaid] unknown country code ${countryCode}`);
  }
};

export const toPlaidCountryCode = (countryCode: string) => {
  switch (countryCode) {
    case "IT":
      return CountryCode.It;
    case "US":
      return CountryCode.Us;
    default:
      throw new Error(`[plaid] unknown country code ${countryCode}`);
  }
};
