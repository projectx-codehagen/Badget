import React, { useState } from "react";
import Generatedtext from "@/components/dashboard/generatedtext";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { InputRightSideTest } from "@/components/dashboard/test";
import { UpdatePropertyForm2 } from "@/components/dashboard/updatepropertyform2";
import { UpdatePropertyForm } from "@/components/forms/update-property-form";
import NoPhotoPlaceholder from "@/components/properties/NoPhotoPlaceholder copy";

import { prisma } from "@dingify/db";

export const metadata = {
  title: "Property Details - Propwrite Dashboard",
  description:
    "View and edit your property details, add images, and customize listings to attract potential buyers. Your one-stop destination for managing individual real estate listings on Propwrite.",
};

export const maxDuration = 50;

export default async function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const propertyId = params.id;
  const propertyData = await getPropertyData();
  const hasPhotos = propertyData?.images && propertyData.images.length > 0;

  async function getPropertyData() {
    try {
      // Fetch the property data including images using Prisma
      const propertyData = await prisma.property.findUnique({
        where: { id: propertyId },
        include: { images: true }, // Include the images in the response
      });
      return propertyData;
    } catch (error) {
      console.error("Error fetching property:", error);
      return null;
    }
  }

  // Extract the default values from the property data
  const defaultFormValues = {
    address: propertyData?.address || "",
    description: propertyData?.description || "",
    p_rom: propertyData?.p_rom || "",
    bra: propertyData?.bra || "",
    soverom: propertyData?.soverom || "",
    pris: propertyData?.pris || "",
    takst_text: propertyData?.takst_text || "",
  };

  if (!hasPhotos) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading={propertyData ? propertyData.address : "Property"}
          text="Add images to start"
        ></DashboardHeader>
        <div>
          <NoPhotoPlaceholder slug={params.id} propertyId={propertyId} />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={propertyData ? propertyData.address : "Property"}
        text="Let's start working on your property"
      ></DashboardHeader>
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <Generatedtext
            propertyId={propertyId}
            descriptionData={propertyData.detailedDescription}
          />
        </div>
        <div className="flex-1">
          <UpdatePropertyForm2
            propertyId={propertyId}
            defaultValues={defaultFormValues}
          />
          <div></div>
        </div>
      </div>
    </DashboardShell>
  );
}
