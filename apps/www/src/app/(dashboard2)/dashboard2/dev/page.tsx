"use client";

import React, { useState } from "react";
import { Loader2 as Spinner } from "lucide-react";

export default function PricingPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [language, setLanguage] = useState("english");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/ai/analyzeImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl, language }),
    });

    const responseData = await response.json();
    setIsLoading(false);

    if (responseData.choices && responseData.choices.length > 0) {
      const options = responseData.choices[0].message.content
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => line.replace(/"/g, ""));
      setResults(options);
    } else {
      setResults(["No analysis result found."]);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg flex-col items-center gap-4 px-4"
      >
        {imageUrl && (
          <img src={imageUrl} alt="Preview" className="max-w-xs rounded-md" />
        )}
        <input
          name="imageUrl"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Paste image URL here"
          className="w-full rounded-md border border-gray-300 px-4 py-2"
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2"
        >
          <option value="english">English</option>
          <option value="swedish">Swedish</option>
          <option value="norwegian">Norwegian</option>
        </select>
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2 animate-spin" />
              Analyzing Image...
            </>
          ) : (
            "Analyze Image"
          )}
        </button>

        {results.map((result, index) => (
          <div
            key={index}
            className="mt-4 w-full rounded-md border bg-gray-100 p-4"
          >
            <p className="font-semibold text-gray-700">Option {index + 1}:</p>
            <p>{result}</p>
          </div>
        ))}
      </form>
    </div>
  );
}
