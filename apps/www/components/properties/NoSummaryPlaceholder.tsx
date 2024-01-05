"use client";

import { AddFilesButton } from "@/apps/www/components/buttons/AddFilesButton";
import { EmptyPlaceholder } from "@/apps/www/components/shared/empty-placeholder";

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
