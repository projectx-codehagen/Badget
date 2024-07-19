// actions/generate-options.js

import axios from "axios";

import { prisma } from "@dingify/db";

export const maxDuration = 50;

export async function generateOptions(
  imageId,
  imageUrl,
  language = "norwegian"
) {
  "use server"; // This directive ensures that this function is server-only

  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey) {
    console.error("OpenAI API key is not set in environment variables.");
    throw new Error("OpenAI API key not found");
  }

  const headers = {
    Authorization: `Bearer ${openaiApiKey}`,
    "Content-Type": "application/json",
  };

  const prompts = {
    english:
      "I want you to act as a real estate agent. I would like you to create text based on the image you receive, writing a detailed and appealing property description. The style should be professional, and the description should be about one line long. I want 3 different lines so I can choose. Include unique features and highlight what makes this property special. Don't use '' in the response",
    swedish:
      "Jag vill att du agerar som en fastighetsmäklare. Jag skulle vilja att du skapar text baserad på den bild du får, och skriver en detaljerad och tilltalande egendomsbeskrivning. Stilen bör vara professionell, och beskrivningen bör vara ungefär en mening lång. Jag vill ha 3 olika meningar så att jag kan välja. Inkludera unika funktioner och framhäv vad som gör denna egendom speciell.",
    norwegian:
      "Jeg ønsker at du skal opptre som en eiendomsmegler. Jeg vil at du skal lage tekst basert på bildet du mottar, og skrive en detaljert og tiltalende eiendomsbeskrivelse. Stilen skal være profesjonell, og beskrivelsen skal være omtrent én setning lang. Jeg ønsker 3 forskjellige setninger slik at jeg kan velge. Inkluder unike funksjoner og fremhev hva som gjør denne eiendommen spesiell. Jeg ønsker at du skriver teksten på norsk.",
  };

  const requestBody = {
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompts[language] },
          { type: "image_url", image_url: imageUrl },
        ],
      },
    ],
    max_tokens: 300,
  };

  console.log(`Sending request to OpenAI for image ${imageUrl}`);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestBody,
      { headers }
    );

    console.log(
      `Received response from OpenAI for image ${imageUrl}:`,
      response.data
    );

    const options = response.data.choices[0].message.content
      .split("\n")
      .filter((text) => text.trim() !== "");

    if (options.length < 3) {
      throw new Error("Not enough options returned from Ai.");
    }

    await prisma.image.update({
      where: { id: imageId },
      data: {
        option1: options[0],
        option2: options[1],
        option3: options[2],
      },
    });

    console.log(`Options generated for image ${imageId}:`, options);
  } catch (error) {
    console.error(
      `Error when generating options for image ${imageId}:`,
      error.response ? error.response.data : error
    );
    throw new Error("Failed to generate options");
  }
}
