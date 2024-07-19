import { useRouter } from "next/navigation";

import { Badge } from "@dingify/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dingify/ui/components/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@dingify/ui/components/tabs";

import { UserBadge } from "@/components/UserBadge";

export default function EventsDashboardTable({
  events,
  setSelectedEventId,
  selectedEventId,
}) {
  const router = useRouter();

  const handleUserClick = (customerId) => {
    router.push(`dashboard/users/${customerId}`);
  };

  return (
    <>
      <Tabs defaultValue="week">
        <div className="flex items-center">
          {/* <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList> */}
          {/* <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="h-7 gap-1 text-sm"
                  size="sm"
                  variant="outline"
                >
                  <ListFilterIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Fulfilled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="h-7 gap-1 text-sm" size="sm" variant="outline">
              <FileIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div> */}
        </div>
        <TabsContent value="week">
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Events</CardTitle>
              <CardDescription>
                Monitor your app's real-time events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Channel</TableHead>
                    <TableHead className="hidden sm:table-cell">Name</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      UserID
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Icon</TableHead>
                    <TableHead className="text-right">Notify</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow
                      key={event.id}
                      onClick={() => setSelectedEventId(event.id)}
                      className={
                        selectedEventId === event.id ? "bg-accent" : ""
                      }
                    >
                      <TableCell>
                        {event.channel && event.channel.name && (
                          <div className="font-medium">
                            {event.channel.name}
                          </div>
                        )}
                        {event.channel &&
                          event.channel.project &&
                          event.channel.project.name && (
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              {event.channel.project.name}
                            </div>
                          )}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {event.name}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <UserBadge
                          customerId={event.customerId}
                          userId={event.userId}
                          onClick={handleUserClick}
                          variant={"secondary"}
                        />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {event.icon}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge
                          className="text-xs"
                          variant={event.notify ? "secondary" : "outline"}
                        >
                          {event.notify.toString()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

function FileIcon(props) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function ListFilterIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  );
}
