"use server";

import { prisma } from "@dingify/db";

export async function updatePropertyDetails(propertyId, data) {
  console.log(
    `Request received to update property details. Property ID: ${propertyId}`
  );

  try {
    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: {
        pris: data.pris,
        p_rom: data.p_rom,
        bra: data.bra,
        // ... other fields as necessary
      },
    });

    console.log(
      `Property details updated successfully for property ID: ${propertyId}.`
    );
    return { success: true, property: updatedProperty };
  } catch (error) {
    console.error(
      `Error updating property details for property ID: ${propertyId}`,
      error
    );
    return { success: false, error: error.message };
  }
}
