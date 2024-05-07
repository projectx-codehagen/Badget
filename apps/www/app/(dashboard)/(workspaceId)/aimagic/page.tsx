import { cookies } from "next/headers";



import { AiMagicDashboard } from "../savings/_components/ai-magic-dashboard";
import Chat from "./_components/chat";
import { AI } from "./actions";
import { accounts, mails } from "./data";

export const metadata = {
  title: "AI Magic",
  description: "AI Magic description",
};

export default async function AIMagicPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <>
      <div>
        <AI>
          <Chat />
          {/* <AiMagicDashboard
            accounts={accounts}
            mails={mails}
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
            navCollapsedSize={4}
          /> */}
        </AI>
      </div>
    </>
  );
}
