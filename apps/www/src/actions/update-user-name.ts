"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { userNameSchema } from "@/lib/validations/user";

export interface FormData {
  name: string;
}

export async function updateUserName(userId: string, data: FormData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { name } = userNameSchema.parse(data);

    // Update the user name.
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
      },
    });

    revalidatePath("/dashboard/settings");
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
}
