// actions/delete-customer.ts
"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";

export async function deleteCustomer(customerId) {
  try {
    await prisma.customer.delete({
      where: { id: customerId },
    });

    // Revalidate the path after deleting the customer
    revalidatePath("/dashboard/users");

    return { success: true };
  } catch (error) {
    console.error("Error deleting customer:", error);
    return { success: false, error: error.message };
  }
}
