import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import OpenCardFundingChart from "./OpenCardFundingChart";
import OpenCardFundingDiagram from "./OpenCardFundingDiagram";

export default function OpenUsersFunding() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 flex w-full max-w-4xl flex-col gap-5">
        <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Card className="w-full lg:col-span-3">
            <CardHeader>
              <CardTitle>Total Funding Raised</CardTitle>
              <CardDescription>All time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <OpenCardFundingDiagram />
            </CardContent>
          </Card>
          <Card className="w-full lg:col-span-3">
            <CardHeader>
              <CardTitle>Cap Table</CardTitle>
              <CardDescription>Allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <OpenCardFundingChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// OR if we want it to be bigger
{
  /* <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-6">
  <Card className="w-full lg:col-span-3">
    <CardHeader>
      <CardTitle>All users</CardTitle>
    </CardHeader>
    <CardContent className="pl-2">
      <OpenCardUsers />
    </CardContent>
  </Card>
  <Card className="w-full lg:col-span-3">
    <CardHeader>
      <CardTitle>New users</CardTitle>
      <CardDescription>New users the last 30 days</CardDescription>
    </CardHeader>
    <CardContent>
      <OpenCardUsers />
    </CardContent>
  </Card>
</div> */
}
