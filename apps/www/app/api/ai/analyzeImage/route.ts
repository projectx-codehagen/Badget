import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey) {
    console.error("OpenAI API key is not set in environment variables.");
    return NextResponse.json(
      { error: "OpenAI API key not found" },
      { status: 500 },
    );
  }

  const config = {
    headers: {
      Authorization: `Bearer ${openaiApiKey}`,
      "Content-Type": "application/json",
    },
  };

  const requestBody = await request.json();
  const imageUrl = requestBody.imageUrl;
  const language = requestBody.language;

  const requestTexts = {
    english:
      "I want you to act as a real estate agent. I would like you to create text based on the image you receive, writing a detailed and appealing property description. The style should be professional, and the description should be about one line long. I want 3 different lines so I can choose. Include unique features and highlight what makes this property special.",
    swedish:
      "Jag vill att du agerar som en fastighetsmäklare. Jag skulle vilja att du skapar text baserad på den bild du får, och skriver en detaljerad och tilltalande egendomsbeskrivning. Stilen bör vara professionell, och beskrivningen bör vara ungefär en mening lång. Jag vill ha 3 olika meningar så att jag kan välja. Inkludera unika funktioner och framhäv vad som gör denna egendom speciell.",
    norwegian:
      "Jeg ønsker at du skal opptre som en eiendomsmegler. Jeg vil at du skal lage tekst basert på bildet du mottar, og skrive en detaljert og tiltalende eiendomsbeskrivelse. Stilen skal være profesjonell, og beskrivelsen skal være omtrent én setning lang. Jeg ønsker 3 forskjellige setninger slik at jeg kan velge. Inkluder unike funksjoner og fremhev hva som gjør denne eiendommen spesiell.",
  };

  // @ts-ignore
  const requestText = requestTexts[language] || requestTexts["english"];

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: requestText },
              { type: "image_url", image_url: imageUrl },
            ],
          },
        ],
        max_tokens: 300,
      },
      config,
    );

    console.log(
      "Image analysis completed, response data:",
      JSON.stringify(response.data, null, 2),
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Failed to analyze image, caught error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 },
    );
  }
}
