// actions/add-asset.ts
"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function addAsset(data: {
  name: string;
  currencyIso: string;
  assetType: string;
  amount: number;
}) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const asset = await prisma.asset.create({
    data: {
      ...data,
      userId: user.id,
      originalPayload: {},
    },
  });

  return asset;
}
