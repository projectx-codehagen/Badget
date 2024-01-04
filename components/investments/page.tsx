import { cookies } from "next/headers";
import Image from "next/image";

import { isValidJSONString } from "@/lib/utils";

import { InvestmentsDashboard } from "./components/investment-dashboard";
import { accounts, mails } from "./data";

export default function InvestmentsPage() {
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
        <InvestmentsDashboard
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
