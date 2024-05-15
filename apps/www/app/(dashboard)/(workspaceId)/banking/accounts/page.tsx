import { cookies } from "next/headers";
import { api } from "@/trpc/server";

import { AccountsDashboard } from "./_components/accounts-dashboard";
import { mails } from "./data";

export const metadata = {
  title: "Accounts",
  description: "Accounts description",
};

export default async function BankingAccountPage() {
  const layout = cookies().get("react-resizable-panels:layout-accounts");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  const assets = await api.asset.getAllAssets.query();
  console.log(assets);
  const accounts = await api.account.getAllAccounts.query();

  return (
    <>
      <div className="flex flex-col">
        <AccountsDashboard mails={mails} defaultLayout={defaultLayout} />
      </div>
    </>
  );
}
