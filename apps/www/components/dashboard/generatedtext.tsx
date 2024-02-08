"use client";

import { useState } from "react";

import DescriptionDisplay from "./descriptiondisplay";

// @ts-ignore
const Generatedtext = ({ propertyId, descriptionData }) => {
  const [localDescriptionData, setLocalDescriptionData] =
    useState(descriptionData);

  return (
    <div>
      <DescriptionDisplay
        descriptionData={localDescriptionData} // Use localDescriptionData here
        propertyId={propertyId}
        setDescriptionData={setLocalDescriptionData} // This function updates localDescriptionData
      />
    </div>
  );
};

export default Generatedtext;
