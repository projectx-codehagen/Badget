// app/api/ai/generateDescription/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { allResponses, text } = requestBody;

  // Construct messages for the chat completion request
  // @ts-ignore
  const messages = allResponses.map((response) => {
    return {
      role: "user",
      content: `Options: ${response.options.join(", ")}.`,
    };
  });

  console.log(messages);

  // Add the specific request text
  messages.push({
    role: "system",
    content:
      "I need you to act like a real estate agent and write a description for this house. I need a title and a description",
  });
  messages.push({ role: "user", content: text });

  try {
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    // Extracting the assistant's response
    const completion = openaiResponse.data.choices[0].message.content;

    // Send the assistant's response back to the client
    return NextResponse.json({ description: completion });
  } catch (error) {
    console.error("Error in generating description:", error);
    return NextResponse.json(
      { error: "Failed to generate description" },
      { status: 500 },
    );
  }
}
