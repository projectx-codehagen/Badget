import {
  ActivityIcon,
  GitBranchIcon,
  GitPullRequestIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Static data - replace these with actual data fetched from GitHub if needed
const githubData = {
  stars: 5269,
  openIssues: 43,
  mergedPRs: 366,
  totalContributors: 43,
};

export default async function OpenCardSection() {
  const GithubInfo = await fetch(
    "https://api.github.com/repos/projectx-codehagen/projectx",
    {
      next: {
        revalidate: 3600,
      },
    },
  );
  const data = await GithubInfo.json();

  const prsResponse = await fetch(
    `https://api.github.com/search/issues?q=repo:projectx-codehagen/projectx+type:pr+is:merged`,
  );
  const TotalPR = await prsResponse.json();

  return (
    <section className="container -mt-10 flex flex-col items-center">
      <div className="mx-auto grid w-full max-w-4xl gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stars</CardTitle>
            <StarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stargazers_count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.open_issues}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Merged PR's</CardTitle>
            <GitPullRequestIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{TotalPR.total_count}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forks</CardTitle>
            <GitBranchIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.forks}</div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
