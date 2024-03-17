"use client";

import * as React from "react";
import {
  BarChart,
  CreditCard,
  HelpCircle,
  Layers,
  LayoutDashboard,
  Repeat2,
  Settings,
  Sparkle,
  Sprout,
  Tag,
  Wallet,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AddButton } from "@/components/buttons/AddButton";
import { AddAssetFlow } from "@/components/modals/add-asset-flow";
import { WorkspaceSwitcher } from "@/app/(dashboard)/_components/workspace-switcher";
import { Nav } from "@/app/(dashboard)/(workspaceId)/dashboard/_components/nav";
import { CardsStats } from "@/app/(dashboard)/(workspaceId)/dashboard/_components/stats";
import { TopCategoriesTable } from "@/app/(dashboard)/(workspaceId)/dashboard/_components/top-categories-table";
import { TransactionsReviewTable } from "@/app/(dashboard)/(workspaceId)/dashboard/_components/transaction-review-table";
import type { Mail } from "@/app/(dashboard)/(workspaceId)/dashboard/data";
import { useMail } from "@/app/(dashboard)/(workspaceId)/dashboard/use-mail";

interface DashboardProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Dashboard({
  accounts,
  mails,
  defaultLayout = [20, 40, 40],
  defaultCollapsed = false,
  navCollapsedSize,
}: DashboardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [mail] = useMail();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="h-full max-h-[1200px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={(collapsed) => {
            setIsCollapsed(collapsed);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              collapsed,
            )}`;
          }}
          className={cn(
            isCollapsed &&
            "min-w-[50px] transition-all duration-300 ease-in-out",
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center px-2",
              isCollapsed ? "h-[52px]" : "px-2",
            )}
          >
            <WorkspaceSwitcher isCollapsed={isCollapsed} />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Dashboard",
                label: "",
                icon: LayoutDashboard,
                variant: "default",
                link: "/dashboard/",
              },
              {
                title: "Transactions",
                label: "9",
                icon: Layers,
                variant: "ghost",
                link: "/dashboard/transactions",
              },
              {
                title: "Accounts",
                label: "3",
                icon: CreditCard,
                variant: "ghost",
                link: "/dashboard/accounts",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Investments",
                label: "Next",
                icon: BarChart,
                variant: "ghost",
                link: "/dashboard/investments",
              },
              {
                title: "Categories",
                label: "Upcoming",
                icon: Tag,
                variant: "ghost",
                link: "/dashboard/categories",
              },
              {
                title: "Recurring",
                label: "Upcoming",

                icon: Repeat2,
                variant: "ghost",
                link: "/dashboard/recurring",
              },
              {
                title: "Ai Magic",
                label: "Upcoming",

                icon: Sparkle,
                variant: "ghost",
                link: "/dashboard/aimagic",
              },
              {
                title: "Save Money",
                label: "Future",
                icon: Wallet,
                variant: "ghost",
                link: "/dashboard/savemoney",
              },
              {
                title: "Grow Assets",
                label: "Future",
                icon: Sprout,
                variant: "ghost",
                link: "/dashboard/",
              },
            ]}
          />
          <Separator />
          {/* <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Credit Card",
                label: "972",
                icon: CreditCard,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Credit Card",
                label: "342",
                icon: CreditCard,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Checking",
                label: "128",
                icon: DollarSign,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Savings",
                label: "8",
                icon: PiggyBank,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Banking",
                label: "21",
                icon: Building,
                variant: "ghost",
                link: "/dashboard/",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Funds",
                label: "483",
                icon: Briefcase,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Coinbase",
                label: "145",
                icon: BadgeDollarSign,
                variant: "ghost",
                link: "/dashboard/",
              },
            ]}
          /> */}
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Get help",
                label: "",
                icon: HelpCircle,
                variant: "ghost",
                link: "/dashboard/",
              },
              {
                title: "Settings",
                label: "",
                icon: Settings,
                variant: "ghost",
                link: "/dashboard/settings",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <ScrollArea className="h-fit min-h-screen">
            <div className="flex h-[52px] items-center justify-between px-4 py-2">
              <div>
                <h1 className="text-xl font-bold">Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <AddButton triggerLabel="Add Asset">
                  <AddAssetFlow />
                </AddButton>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-4 p-4">
              <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form />
              </div>

              <CardsStats />
              {/* <div className="ml-6 mt-6 flex gap-4"> */}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                <TransactionsReviewTable />
                <TopCategoriesTable />
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
