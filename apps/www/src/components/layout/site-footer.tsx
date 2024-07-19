import * as React from "react";
import Link from "next/link";

import { footerLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { Icons } from "@/components/shared/icons";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className, "border-t")}>
      <div className="container mx-auto grid grid-cols-1 gap-6 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="flex flex-col justify-between lg:col-span-2">
          <div>
            {/* <Icons.logo className="h-8 w-8" /> */}
            <p>Powered by Badget - That makes you save money</p>
            <div className="flex gap-4">
              <Icons.twitter className="mt-4 h-4 w-4" />
              {/* <Icons.twitter className="mt-4 h-4 w-4" /> */}
            </div>
          </div>
        </div>
        {footerLinks.map((section) => (
          <div key={section.title} className="lg:col-span-1">
            <span className="text-sm font-medium text-foreground">
              {section.title}
            </span>
            <ul className="mt-4 list-inside space-y-3">
              {section.items?.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container mx-auto flex h-12 items-center justify-between py-4">
        <p className="text-sm">
          Built by{" "}
          <a href={siteConfig.links.twitter} className="font-medium underline">
            Badget
          </a>
          . Open source for{" "}
          <a href={siteConfig.links.github} className="font-medium underline">
            everyone
          </a>
          .
        </p>
        <ModeToggle />
      </div>
    </footer>
  );
}
