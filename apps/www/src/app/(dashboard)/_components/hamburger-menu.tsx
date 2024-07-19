"use client";

import { useParams, usePathname } from "next/navigation";
import { AlignJustify } from "lucide-react";

import { Separator } from "@dingify/ui/components/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@dingify/ui/components/sheet";

import { Icons } from "@/components/shared/icons";
import { sideNavItems, siteConfig } from "@/app/config";

import { ExpandedItem } from "../(workspaceId)/_components/sidebar-nav";

export default function HamburgerMenu() {
  const params = useParams<{ workspaceId: string }>();
  const path = usePathname();

  const pathname = path.replace(`/${params.workspaceId}`, "") || "/";
  const [_, currentPath] = pathname.split("/");

  return (
    <div className="flex lg:hidden">
      <Sheet>
        <SheetTrigger>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-2">
              <Icons.logo />
              <span className="inline-block font-urban text-xl font-bold">
                {siteConfig.name}
              </span>
            </SheetTitle>
          </SheetHeader>

          {sideNavItems.map((group) => {
            return (
              <div key={group.group}>
                <Separator className="mb-2 mt-2" />
                <div className="flex flex-col gap-1 p-2">
                  {group.items.map((link, idx) => {
                    return (
                      <ExpandedItem
                        key={link.href + idx}
                        item={link}
                        currentPath={"/" + currentPath}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </SheetContent>
      </Sheet>
    </div>
  );
}
