"use client";

import { useRouter } from "next/navigation";
import { deleteEvent } from "@/actions/delete-event";
import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { BellIcon, BellOffIcon, Tag, TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@dingify/ui/components/badge";
import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@dingify/ui/components/dropdown-menu";
import { Separator } from "@dingify/ui/components/separator";

export function ChannelCard({ channelDetails }) {
  const router = useRouter();

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      toast.success("The event has been deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error("There was an error deleting the event.");
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      {channelDetails.events.map((event) => (
        <Card key={event.id} className="m-4">
          <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
            <div className="space-y-1">
              <CardTitle>
                {event.name} <span>{event.icon}</span>
              </CardTitle>
              <CardDescription>{event.userId}</CardDescription>
            </div>
            <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
              <Button variant="secondary" className="px-3 shadow-none">
                {event.notify ? (
                  <BellIcon className="mr-1 h-4 w-4" />
                ) : (
                  <BellOffIcon className="mr-1 h-4 w-4" />
                )}
                Notify
              </Button>
              <Separator orientation="vertical" className="h-[20px]" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="px-2 shadow-none">
                    <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  alignOffset={-5}
                  className="w-[200px]"
                  forceMount
                >
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => handleDelete(event.id)}>
                    <TrashIcon className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusIcon className="mr-2 h-4 w-4" /> Placeholder
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Tag className="mr-1 h-3 w-3 " />
                Placeholder
              </div>
              <div className="flex items-center">
                <StarIcon className="mr-1 h-3 w-3" />
                Placeholder
              </div>
              <div>{format(new Date(event.createdAt), "dd.MM.yyyy HH:mm")}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
