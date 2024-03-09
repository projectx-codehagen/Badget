import Link from "next/link";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { navItems } from "@/app/config";

const CollapsedItem = ({
  item,
  key,
}: {
  item: (typeof navItems)[number];
  key: string;
}) => {
  return (
    <Tooltip key={key} delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-9 w-9",
          )}
        >
          <item.icon className="h-4 w-4" />
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
  key,
}: {
  item: (typeof navItems)[number];
  key: string;
}) => {
  return (
    <Link
      key={key}
      href={item.href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "justify-start",
      )}
    >
      <item.icon className="mr-2 h-4 w-4" />
      {item.title}
      <span className={cn("ml-auto")}>
        {item?.badge && <Badge>{item.badge}</Badge>}
      </span>
    </Link>
  );
};

// TODO: idx not needed as key when all items have unique hrefs
// also, the active link should be filtered by href and not idx
export function MainNav({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <nav
      className={cn("grid gap-1 px-2", { "justify-center px-2": isCollapsed })}
    >
      {navItems.map((link) =>
        isCollapsed ? (
          <CollapsedItem key={link.href} item={link} />
        ) : (
          <ExpandedItem key={link.href} item={link} />
        ),
      )}
    </nav>
  );
}
