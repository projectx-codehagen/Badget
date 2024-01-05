import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { TransactionsDashboard } from "@/apps/www/components/transactions/components/transactions-dashboard";
import { accounts, mails } from "@/apps/www/components/transactions/data";
import { authOptions } from "@/apps/www/lib/auth";
import { getCurrentUser } from "@/apps/www/lib/session";
import { isValidJSONString } from "@/apps/www/lib/utils";

export const metadata = {
  title: "Transactions",
  description: "Transactions description",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  //TODO Fix this - Draw bar right is not working. Look at documentation

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
        <TransactionsDashboard
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
