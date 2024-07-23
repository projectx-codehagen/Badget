"use client";

import { Button } from "@dingify/ui/components/button";

import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

import { DocsButton } from "../buttons/DocsButton";

export default function NoPhotoPlaceholder() {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="party" />
      <EmptyPlaceholder.Title>Your events</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Your events for this channel will appear here.
      </EmptyPlaceholder.Description>
      <div className="space-x-2">
        <Button>Comming soon</Button>

        <DocsButton />
      </div>
    </EmptyPlaceholder>
  );
}
