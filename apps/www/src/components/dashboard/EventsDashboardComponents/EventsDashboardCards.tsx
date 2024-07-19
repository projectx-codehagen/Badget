import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import { Progress } from "@dingify/ui/components/progress";

import { CreateEventButton } from "@/components/buttons/CreatEventButton";

import { EventDashboardDetailsSheet } from "./EventDashboardDetailsSheet";

export default function EventsDashboardCards({ eventStats }) {
  return (
    <>
      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Your Events</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Introducing Our Dynamic Orders Dashboard for Seamless Management and
            Insightful Analysis.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          {/* <EventDashboardDetailsSheet /> */}
          <CreateEventButton />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>This Week</CardDescription>
          <CardTitle className="text-4xl">
            {eventStats.currentWeekEvents}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {eventStats.weeklyChange >= 0
              ? `+${eventStats.weeklyChange.toFixed(2)}%`
              : `${eventStats.weeklyChange.toFixed(2)}%`}{" "}
            from last week
          </div>
        </CardContent>
        <CardFooter>
          <Progress
            aria-label={`${eventStats.weeklyChange.toFixed(2)}% change`}
            value={eventStats.weeklyChange}
          />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-4xl">
            {eventStats.currentMonthEvents}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {eventStats.monthlyChange >= 0
              ? `+${eventStats.monthlyChange.toFixed(2)}%`
              : `${eventStats.monthlyChange.toFixed(2)}%`}{" "}
            from last month
          </div>
        </CardContent>
        <CardFooter>
          <Progress
            aria-label={`${eventStats.monthlyChange.toFixed(2)}% change`}
            value={eventStats.monthlyChange}
          />
        </CardFooter>
      </Card>
    </>
  );
}
