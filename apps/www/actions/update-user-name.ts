"use server";

import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs";

import { userNameSchema } from "@projectx/validators";

export type FormData = {
  name: string;
};

export async function updateUserName(userId: string, data: FormData) {
  try {
    const { name } = userNameSchema.parse(data);
    await clerkClient.users.updateUser(userId, {
      username: name,
    });

    revalidatePath("/dashboard/settings");
    return { status: "success" };
  } catch (error) {
    console.error(error);
    return { status: "error" };
  }
}
