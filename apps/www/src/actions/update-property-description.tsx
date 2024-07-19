"use server";

import { prisma } from "@dingify/db";

export async function updatePropertyDescription(propertyId, description) {
  console.log(
    `Request received to update property description. Property ID: ${propertyId}`
  );

  try {
    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: { detailedDescription: description },
    });

    console.log(
      `Description updated successfully for property ID: ${propertyId}.`
    );
    return { success: true, property: updatedProperty };
  } catch (error) {
    console.error(
      `Error updating property description for property ID: ${propertyId}`,
      error
    );
    return { success: false, error: error.message };
  }
}
