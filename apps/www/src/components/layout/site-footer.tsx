import * as React from "react";
import Link from "next/link";
import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { Icons } from "@/components/shared/icons";

const footerNavs = [
  {
    label: "Product",
    items: [
      {
        href: "/",
        name: "Docs",
      },
      {
        href: "/pricing",
        name: "Pricing",
      },
      {
        href: "/open",
        name: "Open Startup",
      },
    ],
  },
  // {
  //   label: "Community",
  //   items: [
  //     {
  //       href: "/",
  //       name: "Discord",
  //     },
  //     {
  //       href: "/",
  //       name: "Twitter",
  //     },
  //     {
  //       href: "mailto:hello@chatcollect.com",
  //       name: "Email",
  //     },
  //   ],
  // },
  // {
  //   label: "Legal",
  //   items: [
  //     {
  //       href: "/terms",
  //       name: "Terms",
  //     },
  //     {
  //       href: "/privacy",
  //       name: "Privacy",
  //     },
  //   ],
  // },
];

const footerSocials = [
  {
    href: "https://discord.com",
    name: "Discord",
    icon: <DiscordLogoIcon className="h-4 w-4" />,
  },
  {
    href: "https://twitter.com",
    name: "Twitter",
    icon: <TwitterLogoIcon className="h-4 w-4" />,
  },
];

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Icons.logo />
            <p className="text-center text-sm leading-loose md:text-left">
              Built by{" "}
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Codehagen
              </a>
            </p>
          </div>
          <ModeToggle />
        </div> */}
        <div className="gap-4 p-4 px-8 py-16 sm:pb-16 md:flex md:justify-between">
          <div className="mb-12 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="h-8 w-8 text-primary" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Dingify
              </span>
            </Link>
            <p className="max-w-xs">Unlock real time alerts</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
            {footerNavs.map((nav) => (
              <div key={nav.label}>
                <h2 className="mb-6 text-sm font-medium uppercase tracking-tighter text-gray-900 dark:text-white">
                  {nav.label}
                </h2>
                <ul className="grid gap-2">
                  {nav.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="cursor-pointer text-sm font-[450] text-gray-400 duration-200 hover:text-gray-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-md border-neutral-700/20 px-8 py-4 sm:flex sm:flex-row sm:items-center sm:justify-between">
          <div className="flex space-x-5 sm:mt-0 sm:justify-center">
            {footerSocials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="fill-gray-500 text-gray-500 hover:fill-gray-900 hover:text-gray-900 dark:hover:fill-gray-600 dark:hover:text-gray-600"
              >
                {social.icon}
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
