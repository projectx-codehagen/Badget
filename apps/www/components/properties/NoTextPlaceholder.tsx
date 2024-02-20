"use client";

import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

// @ts-ignore
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
