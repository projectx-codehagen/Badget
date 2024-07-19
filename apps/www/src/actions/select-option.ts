// actions/select-option.js
"use server";

import { prisma } from "@dingify/db";

export async function selectOption(imageId, selectedOptionKey) {
  console.log(
    `Attempting to update selected option for imageId: ${imageId} with selectedOptionKey: ${selectedOptionKey}`
  );

  try {
    const updateResponse = await prisma.image.update({
      where: { id: imageId },
      data: {
        selectedOption: selectedOptionKey,
      },
    });

    console.log(`Update response from Prisma:`, updateResponse);
    console.log(`Selected option updated successfully for image ${imageId}`);

    return { success: true };
  } catch (error) {
    console.error(
      `Error when calling prisma.image.update for imageId ${imageId} with selectedOptionKey ${selectedOptionKey}:`,
      error
    );
    return { success: false, error: "Failed to update selected option" };
  }
}
