"use client";

import { useRouter } from "next/navigation";
import { deleteEvent } from "@/actions/delete-event";
import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { BellIcon, BellOffIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@dingify/ui/components/badge";
import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@dingify/ui/components/dropdown-menu";
import { Separator } from "@dingify/ui/components/separator";

export function UsersCard({ channelDetails }) {
  const router = useRouter();

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      toast.success("The event has been deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error("There was an error deleting the event.");
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <Button>asdasdasd</Button>
    </div>
  );
}
