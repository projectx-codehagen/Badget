"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { AlignJustify } from "lucide-react";
import { sideNavItems, siteConfig } from "@/app/config";
import { Icons } from "@/components/shared/icons";
import { ExpandedItem } from "../(workspaceId)/_components/sidebar-nav";
import { useParams, usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

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
                    )
                  })}
                </div>
              </div>
            );
          })}
        </SheetContent>
      </Sheet>
    </div>
  )
}
