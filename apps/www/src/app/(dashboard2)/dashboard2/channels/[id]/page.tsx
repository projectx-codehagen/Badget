import { getChannelDetails } from "@/actions/get-channel-details";

import { ChannelCard } from "@/components/channels/ChannelCard";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import NoPhotoPlaceholder from "@/components/properties/NoPhotoPlaceholder copy";

export default async function ChannelPage({
  params,
}: {
  params: { id: string };
}) {
  const channelId = params.id;

  console.log("Channel ID from params:", channelId); // Debugging log

  if (!channelId) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Channel not found"
          text="Invalid channel ID."
        />
      </DashboardShell>
    );
  }

  try {
    const channelDetails = await getChannelDetails(channelId);

    if (!channelDetails) {
      return (
        <DashboardShell>
          <DashboardHeader
            heading="Channel not found"
            text="We couldn't find the channel you're looking for."
          />
          <NoPhotoPlaceholder />
        </DashboardShell>
      );
    }

    if (channelDetails.events.length === 0) {
      return (
        <DashboardShell>
          <DashboardHeader
            heading={channelDetails.name}
            text="This channel has no events yet."
          />
          <NoPhotoPlaceholder />
        </DashboardShell>
      );
    }

    return (
      <DashboardShell>
        <DashboardHeader
          heading={channelDetails.name}
          text="Let's start working on your channel"
        />
        <div>
          <ChannelCard channelDetails={channelDetails} />
        </div>
      </DashboardShell>
    );
  } catch (error) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Error" text={error.message} />
      </DashboardShell>
    );
  }
}
