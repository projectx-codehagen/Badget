import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { CreditCard, LayoutDashboard, LogOut, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/shared/user-avatar";

export type NormalizedUser = {
  name: string;
  email: string;
  imageUrl: string;
};

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: NormalizedUser | null;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const { signOut } = useClerk();
  const router = useRouter();

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            username: user.name,
            imageUrl: user.imageUrl,
          }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center space-x-2.5">
            <LayoutDashboard className="h-4 w-4" />
            <p className="text-sm">Dashboard</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/billing"
            className="flex items-center space-x-2.5"
          >
            <CreditCard className="h-4 w-4" />
            <p className="text-sm">Billing</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/settings"
            className="flex items-center space-x-2.5"
          >
            <Settings className="h-4 w-4" />
            <p className="text-sm">Settings</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut(() => router.push("/"));
          }}
        >
          <div className="flex items-center space-x-2.5">
            <LogOut className="h-4 w-4" />
            <p className="text-sm">Log out </p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button
      className="px-3"
      variant="default"
      size="sm"
      onClick={() => router.push("/signin")}
    >
      Sign In
    </Button>
  );
}
