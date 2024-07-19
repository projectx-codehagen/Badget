"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrganization, useOrganizationList, useUser } from "@clerk/nextjs";
import { Check, ChevronDown, ChevronsUpDown, PlusCircle } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@dingify/ui/components/avatar";
import { Button } from "@dingify/ui/components/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@dingify/ui/components/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dingify/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@dingify/ui/components/form";
import { Input } from "@dingify/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@dingify/ui/components/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dingify/ui/components/select";
import { useToast } from "@dingify/ui/components/use-toast";

import { cn } from "@/lib/utils";

type WorkspaceSwitcherProps = {
  isCollapsed: boolean;
};

export function WorkspaceSwitcher({ isCollapsed }: WorkspaceSwitcherProps) {
  const router = useRouter();

  const [switcherOpen, setSwitcherOpen] = React.useState(false);
  const [newOrgDialogOpen, setNewOrgDialogOpen] = React.useState(false);

  const orgs = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  const org = useOrganization();

  const { user, isSignedIn, isLoaded } = useUser();
  if (isLoaded && !isSignedIn) throw new Error("How did you get here???");

  const activeOrg = org.organization ?? user;
  if (
    !orgs.isLoaded ||
    !org.isLoaded ||
    !activeOrg ||
    orgs.userMemberships.isLoading
  ) {
    // Skeleton loader
    return (
      <Button
        variant="ghost"
        size="sm"
        role="combobox"
        aria-expanded={switcherOpen}
        aria-label="Select a workspace"
        className="w-52 justify-between opacity-50"
      >
        <Avatar className="mr-2 h-5 w-5">
          <AvatarFallback>Ac</AvatarFallback>
        </Avatar>
        <div className={cn("flex justify-between", isCollapsed && "hidden")}>
          <span>Select a workspace</span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0" />
        </div>
      </Button>
    );
  }

  const normalizedObject = {
    id: activeOrg.id,
    name: "name" in activeOrg ? activeOrg.name : activeOrg.fullName,
    image: activeOrg.imageUrl,
  };

  return (
    <Dialog open={newOrgDialogOpen} onOpenChange={setNewOrgDialogOpen}>
      <Popover open={switcherOpen} onOpenChange={setSwitcherOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            role="combobox"
            aria-expanded={switcherOpen}
            aria-label="Select a workspace"
            className={cn(
              "flex w-full items-center gap-2 border [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
              isCollapsed &&
                "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden",
            )}
          >
            <div className="flex justify-between">
              <Avatar className={cn("h-5 w-5", !isCollapsed && "mr-2")}>
                <AvatarImage src={normalizedObject?.image ?? ""} />
                <AvatarFallback>
                  {normalizedObject.name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span
                className={cn("whitespace-nowrap", isCollapsed && "hidden")}
              >
                {normalizedObject.name}
              </span>
            </div>
            <ChevronDown
              className={cn(
                "ml-auto h-4 w-4 shrink-0 opacity-50",
                isCollapsed && "hidden",
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="ml-2 w-52 p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search workspace..." />
              <CommandGroup heading="Personal account">
                <CommandItem
                  onSelect={async () => {
                    if (!user?.id) return;
                    normalizedObject.id = user.id ?? "";

                    await orgs.setActive?.({ organization: null });
                    setSwitcherOpen(false);
                    router.push(`/${user.id}`);
                  }}
                  className="cursor-pointer text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={user?.imageUrl}
                      alt={user?.fullName ?? ""}
                    />
                    <AvatarFallback>
                      {`${user?.firstName?.[0]}${user?.lastName?.[0]}` ?? "JD"}
                    </AvatarFallback>
                  </Avatar>
                  {user?.fullName}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      org.organization === null ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Organizations">
                {orgs.userMemberships.data?.map(({ organization: org }) => (
                  <CommandItem
                    key={org.name}
                    onSelect={async () => {
                      await orgs.setActive({ organization: org });
                      setSwitcherOpen(false);
                      router.push(`/${org.id}`);
                    }}
                    className="cursor-pointer text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={org.imageUrl ?? "/images/placeholder.png"}
                        alt={org.name}
                      />
                      <AvatarFallback>
                        {org.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {org.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        normalizedObject?.id === org.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setSwitcherOpen(false);
                      setNewOrgDialogOpen(true);
                    }}
                    className="cursor-pointer"
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Organization
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <React.Suspense></React.Suspense>
    </Dialog>
  );
}
