// actions/add-real-estate.ts
"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function addRealEstate(data: {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  purchaseDate: Date;
  purchaseValue: number;
  currentValue?: number;
  currencyIso: string;
}) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const asset = await prisma.asset.create({
    data: {
      name: data.name,
      assetType: "REAL_ESTATE",
      userId: user.id,
      originalPayload: {},
    },
  });

  const realEstate = await prisma.assetRealEstate.create({
    data: {
      assetId: asset.id,
      address: data.address,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      purchaseDate: data.purchaseDate,
      purchaseValue: data.purchaseValue,
      currentValue: data.currentValue,
      currencyIso: data.currencyIso,
    },
  });

  return realEstate;
}
