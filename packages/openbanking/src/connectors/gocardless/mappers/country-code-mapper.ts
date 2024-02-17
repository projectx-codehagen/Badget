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

export const toGoCardlessCountryCode = (countryCode: string) => {
  switch (countryCode) {
    case "IT":
      return "IT";
    case "US":
      return CountryCode.Us;
    default:
      console.error(`[gocardless] unknown country code ${countryCode}`);
  }
};
