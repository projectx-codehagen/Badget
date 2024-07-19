import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@dingify/ui/components/table";

// TODO Only show the 5 first events

export default function UsersDashboardTable({ customerDetails }) {
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Customer Journey</CardTitle>
        <CardDescription>
          A detailed view of the customer's journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Channel</TableHead>
            <TableHead className="hidden md:table-cell">Icon</TableHead>
          </TableRow>
          <TableBody>
            {customerDetails.events.slice(0, 5).map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  {format(new Date(event.createdAt), "dd.MM.yy HH.mm")}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {event.name}
                </TableCell>
                <TableCell>{event.channel.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {event.icon}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
