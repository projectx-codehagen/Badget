import React from "react";

import NoTextPlaceholder from "../properties/NoTextPlaceholder";
import { Card, CardContent, CardFooter } from "../ui/card";

const DescriptionDisplay = ({
  // @ts-ignore
  descriptionData,
  // @ts-ignore
  propertyId,
  // @ts-ignore
  setDescriptionData,
}) => {
  // Check if descriptionData is empty
  if (!descriptionData) {
    return (
      <NoTextPlaceholder
        propertyId={propertyId}
        setDescriptionData={setDescriptionData}
      />
    );
  }

  let parsedData;
  try {
    // Attempt to parse the JSON string in descriptionData
    parsedData = JSON.parse(descriptionData.replace(/```json\n|\n```/g, ""));
    // parsedData = JSON.parse("invalid json"); // For testing error message
  } catch (error) {
    console.error(
      `Error parsing description data for property ID ${propertyId}:`,
      error,
    );

    // Render a user-friendly error message with a retry option
    return (
      <Card>
        <CardContent>
          <p className="mt-4 text-muted-foreground">
            We encountered an issue displaying this property description.
          </p>
          <p className="text-muted-foreground">
            Please try again or contact support if the issue persists.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0"></CardFooter>
      </Card>
    );
  }

  // Function to recursively render content
  // @ts-ignore
  const renderContent = (data, isNested = false) => {
    if (typeof data === "object" && !Array.isArray(data) && data !== null) {
      return Object.entries(data).map(([key, value], index) => (
        <div key={index} className={isNested ? "mt-2" : "mt-4"}>
          <h3 className="font-semibold capitalize">{key}</h3>
          {renderContent(value, true)}
        </div>
      ));
    } else if (Array.isArray(data)) {
      return data.map((item, index) => (
        <div key={index} className="mt-4">
          {item.title && <h4 className="font-semibold">{item.title}</h4>}
          {renderContent(item.details || item, true)}
        </div>
      ));
    } else {
      return <p className="text-muted-foreground">{data}</p>;
    }
  };

  // Render the parsed content
  return (
    <Card>
      <CardContent>{renderContent(parsedData)}</CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0"></CardFooter>
    </Card>
  );
};

export default DescriptionDisplay;
