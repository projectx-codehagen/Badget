"use server";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { getServerSession } from "next-auth";

import { prisma } from "@dingify/db";

import { generateOptions } from "./generate-options";

export async function uploadImages(propertyId, imageUrls) {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });
  console.log(user);

  const userLanguage = user?.language || "english";

  try {
    const imageRecords = await prisma.$transaction(
      imageUrls.map((imageUrl) => {
        return prisma.image.create({
          data: {
            url: imageUrl,
            propertyId,
            option1: "Generating...", // Placeholder text
            option2: "Generating...", // Placeholder text
            option3: "Generating...", // Placeholder text
          },
        });
      })
    );

    // Generate options for all images and wait for them to complete
    const generationPromises = imageRecords.map((imageRecord) =>
      generateOptions(imageRecord.id, imageRecord.url, userLanguage)
    );

    // Wait for all generation promises to resolve
    await Promise.all(generationPromises);

    // After all options are generated, then return success
    return { success: true, images: imageRecords };
  } catch (error) {
    console.error("Error uploading images:", error);
    return { success: false, error: "Error uploading images" };
  }
}
