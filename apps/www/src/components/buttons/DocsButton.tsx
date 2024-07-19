import Link from "next/link";

import { buttonVariants } from "@dingify/ui/components/button";

import { cn } from "@/lib/utils";

export function DocsButton() {
  return (
    <Link
      href="https://docs.dingify.io/"
      className={cn(buttonVariants({ variant: "outline" }), "px-4")}
    >
      Explore Docs
    </Link>
  );
}
