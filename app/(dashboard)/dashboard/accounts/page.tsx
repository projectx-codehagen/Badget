import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { isValidJSONString } from "@/lib/utils";
import { AccountsDashboard } from "@/components/accounts/components/accounts-dashboard";
import { accounts, mails } from "@/components/accounts/data";

export const metadata = {
  title: "Accounts",
  description: "Accounts description",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout =
    layout && isValidJSONString(layout.value)
      ? JSON.parse(layout.value)
      : undefined;
  const defaultCollapsed =
    collapsed && isValidJSONString(collapsed.value)
      ? JSON.parse(collapsed.value)
      : undefined;

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <AccountsDashboard
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
