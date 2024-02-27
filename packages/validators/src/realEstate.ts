import { z } from "zod";

export const realEstateSchema = z.object({
  address: z
    .string({ required_error: "Address is required" })
    .min(5, { message: "Address must be at least 5 characters" }),
  city: z
    .string({ required_error: "City is required" })
    .min(3, { message: "City must be at least 3 characters" }),
  state: z
    .string({ required_error: "State is required" })
    .min(2, { message: "State must be at least 2 characters" }),
  postalCode: z
    .string({ required_error: "Postal Code is required" })
    .min(5, { message: "Postal Code must be at least 5 characters" }),
  purchaseDate: z.date({ required_error: "Purchase date is required" }),
  purchaseValue: z
    .number({ required_error: "Purchase value is required" })
    .min(1, { message: "Purchase value must be at least 1" }),
  currentValue: z
    .number({ required_error: "Current value is required" })
    .min(1, { message: "Current value must be at least 1" }),
});

export type RealEstate = z.infer<typeof realEstateSchema>;
