import type { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getUserCredits } from "@/actions/get-credits";
import { getCurrentUser } from "@/lib/session";

import { prisma } from "@dingify/db";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  const userCreditsResponse = await getUserCredits();

  if (!user) {
    console.error("Unauthorized: No user found.");
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const requestBody = await request.json();
  const { address, type } = requestBody;

  if (!address) {
    console.error("Bad request: Address is required.");
    return new NextResponse(
      JSON.stringify({ message: "Address is required" }),
      { status: 400 }
    );
  }

  // Ensure userCredits is defined, default to 0 if undefined
  const availableCredits = userCreditsResponse.credits ?? 0;

  try {
    // Check if the user has enough credits
    if (availableCredits <= 0) {
      return new NextResponse(
        JSON.stringify({ message: "Insufficient credits" }),
        { status: 400 }
      );
    }

    // Create new property
    const newProperty = await prisma.property.create({
      data: {
        address,
        label: type || "PROPERTY",
        userId: user.id,
      },
    });

    // Deduct a credit from the user
    await prisma.user.update({
      where: { id: user.id },
      data: { credits: { decrement: 1 } },
    });

    revalidatePath("/dashboard"); // Revalidate the dashboard to update the property list

    console.log("Property created:", newProperty);
    return new NextResponse(JSON.stringify(newProperty), { status: 201 });
  } catch (error) {
    console.error("Internal server error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error creating property" }),
      { status: 500 }
    );
  }
}
