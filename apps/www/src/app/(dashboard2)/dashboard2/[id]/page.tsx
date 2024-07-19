import { getChannelDetails } from "@/actions/get-channel-details";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import NoPhotoPlaceholder from "@/components/properties/NoPhotoPlaceholder copy";

export default async function ChannelPage({
  params,
}: {
  params: { id: string };
}) {
  const channelId = params.id;

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
          <NoPhotoPlaceholder />
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
