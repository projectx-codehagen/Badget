import { useState } from "react";
import { generateDescription } from "@/actions/generate-description";
import { updatePropertyDescription } from "@/actions/update-property-description";
import { updatePropertyStatus } from "@/actions/update-property-status";
import { Loader2 as Spinner } from "lucide-react";

import { Button } from "@dingify/ui/components/button";

const GenerateDescriptionButton2 = ({ propertyId, onDescriptionGenerated }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGenerateDescription() {
    console.log("Generating description..."); // Log when the process starts
    setIsLoading(true);
    try {
      const description = await generateDescription(propertyId);
      console.log("Generated description:", description);
      onDescriptionGenerated(description);

      // Update the property description
      const updateproperty = await updatePropertyDescription(
        propertyId,
        description
      );

      // If description update is successful, update the status to DONE
      if (updateproperty.success) {
        const statusUpdateResult = await updatePropertyStatus(
          propertyId,
          "DONE"
        );
        console.log("Status updated to DONE:", statusUpdateResult);
      }
    } catch (error) {
      console.error("Error generating description:", error);
    }
    setIsLoading(false);
  }

  return (
    <Button onClick={handleGenerateDescription} disabled={isLoading}>
      {isLoading ? (
        <>
          <Spinner className="mr-2 animate-spin" /> Generating Description...
        </>
      ) : (
        "Generate Description"
      )}
    </Button>
  );
};

export default GenerateDescriptionButton2;
