import { CanonicalCountry } from "@projectx/db";

export const toGoCardlessCountryCode = (countryCode: CanonicalCountry) => {
  switch (countryCode.iso) {
    case "IT":
      return "IT";
    default:
      console.error(`[gocardless] unknown country code ${countryCode}`);
      return "";
  }
};
