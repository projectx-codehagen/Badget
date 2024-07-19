// actions/update-user-language.js
"use server";

import { getCurrentUser } from "@/lib/session";

import { prisma } from "@dingify/db";

export async function updateUserLanguage(language) {
  const user = await getCurrentUser();
  const userId = user?.id;

  console.log(
    `Request received to update language. User ID: ${userId}, Language: ${language}`
  );

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { language },
    });
    console.log(
      `Language updated successfully for user ID: ${userId}. New language: ${language}`
    );
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error(`Error updating user language for user ID: ${userId}`, error);
    return { success: false, error: error.message };
  }
}
