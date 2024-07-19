"use server";

import { prisma } from "@dingify/db";

export async function updatePropertyStatus(propertyId, newStatus) {
  if (!propertyId || !newStatus) {
    console.error("Property ID and new status are required.");
    return { success: false, error: "Missing parameters." };
  }

  try {
    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: { status: newStatus },
    });

    if (updatedProperty) {
      console.log(
        `Status updated for property ID: ${propertyId} to ${newStatus}`
      );
      return { success: true, property: updatedProperty };
    } else {
      console.error(`No property found with ID: ${propertyId}`);
      return { success: false, error: "Property not found." };
    }
  } catch (error) {
    console.error(
      `Error updating status for property ID: ${propertyId}`,
      error
    );
    return { success: false, error: error.message };
  }
}
