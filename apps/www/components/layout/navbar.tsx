"use client";

import { MainNavItem } from "@/types";

import useScroll from "@/hooks/use-scroll";

import { MainNav } from "./main-nav";
import { NormalizedUser, UserAccountNav } from "./user-account-nav";

interface NavBarProps {
  user: NormalizedUser | null;
  items?: MainNavItem[];
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
}

export function NavBar({
  user,
  items,
  children,
  rightElements,
  scroll = false,
}: NavBarProps) {
  const scrolled = useScroll(50);

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? "border-b" : "bg-background/0") : "border-b"
      }`}
    >
      <div className="flex h-16 w-full items-center justify-between p-4">
        <MainNav items={items}>{children}</MainNav>

        <div className="flex items-center space-x-3">
          {rightElements}

          <UserAccountNav user={user} />
        </div>
      </div>
    </header>
  );
}
