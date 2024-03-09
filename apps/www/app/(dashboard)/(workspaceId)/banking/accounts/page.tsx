import { cookies } from "next/headers";

import { AccountsDashboard } from "./_components/accounts-dashboard";
import { mails } from "./data";

export const metadata = {
  title: "Accounts",
  description: "Accounts description",
};

export default async function BankingAccountPage() {
  const layout = cookies().get("react-resizable-panels:layout-accounts");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <>
      <div className="flex flex-col">
        <AccountsDashboard mails={mails} defaultLayout={defaultLayout} />
      </div>
    </>
  );
}
