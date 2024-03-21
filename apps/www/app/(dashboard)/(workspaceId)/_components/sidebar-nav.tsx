import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavItem, sideNavItems } from "@/app/config";

import { WorkspaceSwitcher } from "../../_components/workspace-switcher";

const CollapsedItem = ({
  item,
  currentPath,
}: {
  item: NavItem;
  currentPath: string;
}) => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9",
            currentPath === item.href
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              : "transparent",
            "soon" === item.badge && "cursor-not-allowed opacity-80",
          )}
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          <span className="sr-only">{item.title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {item.title}
        {item?.badge ? <Badge>Coming soon</Badge> : null}
      </TooltipContent>
    </Tooltip>
  );
};

const ExpandedItem = ({
  item,
  currentPath,
}: {
  item: NavItem;
  currentPath: string;
}) => {
  return (
    <Link
      href={item.href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "justify-start",
        currentPath === item.href
          ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
          : "transparent",
        "soon" === item.badge && "cursor-not-allowed opacity-80",
      )}
    >
      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
      {item.title}
      <span className={cn("ml-auto")}>
        {item?.badge && <Badge>{item.badge}</Badge>}
      </span>
    </Link>
  );
};

// TODO: idx not needed as key when all items have unique hrefs
// also, the active link should be filtered by href and not idx
export function SidebarNav({ isCollapsed }: { isCollapsed: boolean }) {
  const params = useParams<{ workspaceId: string }>();
  const path = usePathname();

  // remove the workspaceId from the path when comparing active links in sidebar
  const pathname = path.replace(`/${params.workspaceId}`, "") || "/";
  const [_, currentPath] = pathname.split("/");

  return (
    <nav
      className={cn("flex flex-col", {
        "items-center justify-center": isCollapsed,
      })}
    >
      <div className="p-2">
        <WorkspaceSwitcher isCollapsed={isCollapsed} />
      </div>

      {sideNavItems.map((group) => {
        return (
          <>
            <Separator />
            <div className="flex flex-col gap-1 p-2" key={group.group}>
              {group.items.map((link, idx) => {
                return isCollapsed ? (
                  <CollapsedItem
                    key={link.href + idx}
                    item={link}
                    currentPath={"/" + currentPath}
                  />
                ) : (
                  <ExpandedItem
                    key={link.href + idx}
                    item={link}
                    currentPath={"/" + currentPath}
                  />
                );
              })}
            </div>
          </>
        );
      })}
    </nav>
  );
}

export { ExpandedItem };
