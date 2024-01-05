"use client";

import { AddFilesButton } from "@/apps/www/components/buttons/AddFilesButton";
import { EmptyPlaceholder } from "@/apps/www/components/shared/empty-placeholder";

export default function NoTextPlaceholder({ propertyId, setDescriptionData }) {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="brain" />
      <EmptyPlaceholder.Title>Generate description</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Let Projectx make the summary and text for you.
      </EmptyPlaceholder.Description>
    </EmptyPlaceholder>
  );
}
