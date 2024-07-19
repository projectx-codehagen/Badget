"use client";

import { useState } from "react";

import { AddApiKeyButton } from "@/components/buttons/AddApiKeyButton";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

import { DocsButton } from "../buttons/DocsButton";
import { EventDashboardDetailsSheet } from "./EventsDashboardComponents/EventDashboardDetailsSheet";
import EventsDashboardCards from "./EventsDashboardComponents/EventsDashboardCards";
import EventsDashboardDetails from "./EventsDashboardComponents/EventsDashboardDetails";
import EventsDashboardTable from "./EventsDashboardComponents/EventsDashboardTable";

export default function EventsDashboard({ events, eventStats }) {
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id);

  const selectedEvent = events.find((event) => event.id === selectedEventId);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 pl-0 pr-0 sm:px-0 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <EventsDashboardCards eventStats={eventStats} />
        </div>
        {events.length > 0 ? (
          <EventsDashboardTable
            events={events}
            setSelectedEventId={setSelectedEventId}
            selectedEventId={selectedEventId}
          />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="party" />
            <EmptyPlaceholder.Title>There are no events</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You need to create an event first to see it here
            </EmptyPlaceholder.Description>
            <div className="space-x-2">
              <EventDashboardDetailsSheet />
              <DocsButton />
            </div>
          </EmptyPlaceholder>
        )}
      </div>
      <div>
        <EventsDashboardDetails event={selectedEvent} />
      </div>
    </main>
  );
}
