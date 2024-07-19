"use client";

import {
  endOfMonth,
  format,
  parseISO,
  startOfMonth,
  subMonths,
} from "date-fns";
import ActivityCalendar from "react-activity-calendar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";

type props = {
  date: string;
  count: number;
  level: number;
};

// Example data: array of objects with date and count

export function UserGridActivity({ dings }: { dings: any }) {
  const today = new Date();

  // Create a date 2 months back + last of current month - To fill in blanks
  const firstDayTwoMonthsAgo = startOfMonth(subMonths(today, 2));
  const lastDayCurrentMonth = endOfMonth(today);

  const calendarData: any = [
    { date: format(firstDayTwoMonthsAgo, "yyyy-MM-dd"), count: 0, level: 0 },
    { date: format(lastDayCurrentMonth, "yyyy-MM-dd"), count: 0, level: 0 },
  ];
  dings.map((ding: any) => {
    const eventData: props = {
      date: format(ding.createdAt, "yyyy-MM-dd"),
      count: 1,
      level: 1,
    };

    // Check if date already exist in calendarData
    const existingDate = calendarData.findIndex(
      (event: any) => event.date === eventData.date,
    );

    // If date, update the event-count and level
    if (existingDate !== -1) {
      calendarData[existingDate].count = calendarData[existingDate].count + 1;
      // Level 4 is max (dark green)
      if (calendarData[existingDate].level < 4)
        calendarData[existingDate].level = calendarData[existingDate].level + 1;
    } else {
      calendarData.push(eventData);
    }
  });

  // Sort the calendarData by date - Prevents months from being hidden if no activity
  calendarData.sort((a: any, b: any) => {
    return parseISO(a.date).getTime() - parseISO(b.date).getTime();
  });


  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Activity Calendar</CardTitle>
        <CardDescription>
          A visualization of user activity for the last 3 months.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div style={{ height: "auto", width: "100%" }}>
          <ActivityCalendar
            data={calendarData}
            blockSize={13}
            blockMargin={5}
            fontSize={14}
            hideTotalCount={false}
            showWeekdayLabels
            hideMonthLabels={false}
            theme={{
              light: ["#ebedf0", "#c6e48b", "#7bc96f", "#82ca9d", "#239a3b"],
              dark: ["#282828", "#5c4e4e", "#946b6b", "#b74d4d", "#82ca9d"],
            }}
            labels={{
              months: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              totalCount: "{{count}} activities in {{year}}",
              legend: {
                less: "Less",
                more: "More",
              },
            }}
            colorScheme="light" // Use "dark" for dark mode
            eventHandlers={{
              onClick: (event) => (activity) => {
                alert(JSON.stringify(activity));
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
