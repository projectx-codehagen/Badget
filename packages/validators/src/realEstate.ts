import { z } from "zod";

export const realEstateSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  postalCode: z.string().min(5, "Postal Code must be at least 5 characters"),
  purchaseDate: z.date({ required_error: "Purchase date is required" }),
  purchaseValue: z.number().min(1, "Purchase value must be at least 1"),
  currentValue: z.number().min(1, "Current value must be at least 1"),
});

export type RealEstate = z.infer<typeof realEstateSchema>;
