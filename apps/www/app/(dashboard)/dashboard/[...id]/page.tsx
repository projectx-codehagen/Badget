import React, { useState } from "react";
import { DashboardHeader } from "@/apps/www/components/dashboard/header";
import { DashboardShell } from "@/apps/www/components/dashboard/shell";
import NoPhotoPlaceholder from "@/apps/www/components/properties/NoPhotoPlaceholder copy";

export default function PropertyPage(props: { params: { slug: string } }) {
  //change this to true to test
  const hasPhoto = false;
  const propertyId = "Placeholder";

  if (!hasPhoto) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="{Address_name}"
          text="Lets start working on your property"
        ></DashboardHeader>
        <div>
          <NoPhotoPlaceholder
            slug={props.params.slug}
            propertyId={propertyId}
          />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="{Address_name}"
        text="Lets start working on your property"
      ></DashboardHeader>
      <div>
        <NoPhotoPlaceholder slug={props.params.slug} propertyId={propertyId} />
      </div>
    </DashboardShell>
  );
}
