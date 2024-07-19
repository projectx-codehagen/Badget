import { useRouter } from "next/navigation";
import { deleteEvent } from "@/actions/delete-event";
import { format } from "date-fns";
import { File, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@dingify/ui/components/badge";
import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@dingify/ui/components/dropdown-menu";
import { Separator } from "@dingify/ui/components/separator";

import { ViewDetailsButton } from "@/components/buttons/ViewDetailsButton";
import { UserBadge } from "@/components/UserBadge";

export default function EventsDashboardDetails({ event }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteEvent(event.id);
      toast.success("The event has been deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error("There was an error deleting the event.");
      console.error("Error deleting event:", error);
    }
  };

  const handleUserClick = (customerId) => {
    router.push(`dashboard/users/${customerId}`);
  };

  return (
    <>
      <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {event?.name}
              <Button
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                size="icon"
                variant="outline"
              >
                {/* <CopyIcon className="h-3 w-3" /> */}
                <span className="sr-only">Copy Event ID</span>
              </Button>
            </CardTitle>
            <CardDescription>
              Date:{" "}
              {event?.createdAt ? format(event?.createdAt, "MM/dd/yyyy") : ""}
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <ViewDetailsButton event={event} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 w-8" size="icon" variant="outline">
                  <MoveVerticalIcon className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <File className="mr-2 h-4 w-4" />
                  <span>Export</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleDelete} disabled={!event}>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Event Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Event Type</span>
                <span>{event?.name}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Channel</span>
                <span>
                  <Badge className="text-xs" variant="default">
                    {event?.channel ? event?.channel.name : "No Channel"}
                  </Badge>
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Project</span>
                <span>
                  <Badge className="text-xs" variant="default">
                    {event?.channel && event?.channel.project
                      ? event?.channel.project.name
                      : "No Project"}
                  </Badge>
                </span>
              </li>
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">User</span>
                <span>
                  <UserBadge
                    customerId={event?.customerId}
                    userId={event?.userId}
                    onClick={handleUserClick}
                    variant="outline"
                  />
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Description</span>
                <span>{event?.name}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Icon</span>
                <span>{event?.icon}</span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Notify</span>
                <span>
                  <Badge className="text-xs" variant="outline">
                    {event?.notify.toString()}
                  </Badge>
                </span>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Meta Tags</div>
            <dl className="grid gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Plan</dt>
                <dd>
                  <Badge className="text-xs" variant="secondary">
                    {event?.tags.plan}
                  </Badge>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Cycle</dt>
                <dd>
                  <Badge className="text-xs" variant="secondary">
                    {event?.tags.cycle}
                  </Badge>
                </dd>
              </div>
            </dl>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated
            {/* <time dateTime={new Date(event?.createdAt).toISOString()}>
              {" "}
              {new Date(event?.createdAt).toLocaleDateString()}
            </time> */}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

function TruckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

function MoveVerticalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}

function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
