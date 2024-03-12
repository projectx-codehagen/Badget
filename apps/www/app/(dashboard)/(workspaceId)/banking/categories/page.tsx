import { cookies } from "next/headers";

import {
  accounts,
  mails,
} from "@/app/(dashboard)/(workspaceId)/investment/data";

import { CategoriesDashboard } from "./_components/categories-dashboard";

export const metadata = {
  title: "Categories",
  description: "Categories description",
};

export default async function BankingCategoryPage() {
  const layout = cookies().get("react-resizable-panels:layout-categories");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <>
      <div className="flex flex-col">
        <CategoriesDashboard
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
