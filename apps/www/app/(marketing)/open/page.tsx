import { Suspense } from "react";
import { api } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs";

import { fetchGithubData } from "@/lib/utils";
import OpenCardSection from "@/components/open-page/OpenCardsSection";
import OpenMiddleSection from "@/components/open-page/OpenMiddleSection";
import { OpenSalaryTable } from "@/components/open-page/OpenSalaryTable";
import OpenStartupSection from "@/components/open-page/OpenStartupSection";
import { OpenTableTeam } from "@/components/open-page/OpenTableTeam";
import OpenUsersDiagram from "@/components/open-page/OpenUsersDiagram";
import OpenUsersText from "@/components/open-page/OpenUsersText";

export const metadata = {
  title: "Projectx Pricing - Tailored Plans for Your Real Estate Needs",
  description:
    "Explore competitive pricing plans for Projectx. Find the perfect package to boost your real estate listings with AI",
};

export default async function PricingPage() {
  const user = await currentUser();
  // const subscriptionPlan = await api.auth.mySubscription.query();
  const Githubstats = await fetchGithubData();
  // const x = await api.customer.getAllCustomers.query();
  // console.log(x);

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <OpenStartupSection />
      <OpenCardSection githubData={Githubstats} />
      <OpenTableTeam />
      <OpenSalaryTable />
      <OpenMiddleSection />
      <OpenUsersText />
      <OpenUsersDiagram />
    </div>
  );
}
