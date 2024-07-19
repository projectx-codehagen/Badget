// actions/update-customer.ts
"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db";

export async function changeCustomerDetails(customerId, data) {
  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id: customerId },
      data,
    });

    // Revalidate the path after updating the customer
    revalidatePath("/dashboard/users");

    return { success: true, customer: updatedCustomer };
  } catch (error) {
    console.error("Error updating customer:", error);
    return { success: false, error: error.message };
  }
}
