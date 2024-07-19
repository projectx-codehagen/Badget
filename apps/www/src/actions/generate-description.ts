"use server";

import { prisma } from "@dingify/db";
import { getCurrentUser } from "@/lib/session";
import axios from "axios";

export async function generateDescription(propertyId, seed = 12345) {
  console.log("Fetching images for property ID:", propertyId); // Log the property ID being queried
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const user = await getCurrentUser();
  const userlang = await prisma.user.findUnique({
    where: { id: user?.id },
  });

  const userLanguage = userlang?.language || "english";

  const descriptionPrompts = {
    english:
      "I need you to act as a real estate agent creating a sales ad. I always need a title and the description below. Please format it in JSON. The JSON should always use only title, description, section, details.",
    swedish:
      "Jag behöver att du agerar som en fastighetsmäklare som ska skapa en försäljningsannons. Jag behöver alltid en titel och beskrivningen nedan. Formatera det i JSON-format. JSON bör alltid bara använda titel, beskrivning, avsnitt, detaljer.",
    norwegian:
      "Jeg trenger at du opptrer som en eiendomsmegler som skal lage en salgsannonse. Jeg trenger alltid en tittel og beskrivelsen nedenfor gjerne ha den utfyllende. Formater det i et JSON-format. JSON bør alltid bare bruke tittel, beskrivelse, seksjon, detaljer.",
  };

  let propertyDescriptionText;
  try {
    const images = await prisma.image.findMany({
      where: { propertyId },
      select: { selectedOption: true },
    });

    propertyDescriptionText = images
      .map((image) => image.selectedOption)
      .filter((text) => text != null) // Ensure no null values are included
      .join(" ");
  } catch (fetchError) {
    console.error("Error fetching images from the database:", fetchError);
    throw new Error("Error fetching images from the database");
  }

  if (!openaiApiKey) {
    console.error("OpenAI API key is not set in environment variables.");
    throw new Error("OpenAI API key not found");
  }

  const headers = {
    Authorization: `Bearer ${openaiApiKey}`,
    "Content-Type": "application/json",
  };

  const requestBody = {
    model: "gpt-4-1106-preview", // or another model as needed
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: descriptionPrompts[userLanguage],
      },
      { role: "user", content: propertyDescriptionText },
    ],
  };

  console.log("Sending request to OpenAI with requestBody:", requestBody); // Log the requestBody being sent

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestBody,
      { headers }
    );
    const generatedDescription = response.data.choices[0].message.content;
    console.log("Received response from OpenAI:", generatedDescription); // Log the OpenAI response
    return generatedDescription;
  } catch (error) {
    console.error("Error generating property description with OpenAI:", error);
    throw new Error("Error generating property description with OpenAI");
  }
}
