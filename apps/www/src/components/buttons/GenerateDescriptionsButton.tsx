"use client";

import React from "react";
import { generateDescription } from "@/actions/generate-description";

import { Button } from "@dingify/ui/components/button";

const GenerateDescriptionButton = ({ propertyId }) => {
  async function handleGenerateDescription() {
    try {
      // Replace this with the actual API call to your server function
      const description = await generateDescription(propertyId);
      console.log("Generated Property Description:", description);

      const descriptionObject = JSON.parse(description);
      console.log("Generated Property Description:", descriptionObject);
    } catch (error) {
      console.error("Error generating description:", error);
    }
  }

  return (
    <Button onClick={handleGenerateDescription}>Generate description</Button>
  );
};

export default GenerateDescriptionButton;
