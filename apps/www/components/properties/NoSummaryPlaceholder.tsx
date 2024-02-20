"use client";

import { AddFilesButton } from "@/components/buttons/AddFilesButton";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

// @ts-ignore
export default function NoSummaryPlaceholder({ propertyId, slug }) {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="media" />
      <EmptyPlaceholder.Title>Upload pictures</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Upload pictures to start and let us create the text
      </EmptyPlaceholder.Description>
      <AddFilesButton slug={slug} propertyId={propertyId} />
    </EmptyPlaceholder>
  );
}
