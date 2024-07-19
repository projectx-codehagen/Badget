"use client";

import { useRouter } from "next/navigation";
import { deleteCustomer } from "@/actions/delete-customer";
import { ChevronDownIcon, PlusIcon, StarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { CircleIcon, Tag, TrashIcon } from "lucide-react";
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

import { EditCustomerSheet } from "./EditCustomerSheet";

export function AllUsersCards({ customerDetails }) {
  const router = useRouter();

  const handleDelete = async (customerId) => {
    // Add logic to delete customer if needed
    try {
      deleteCustomer(customerId);
      toast.success("The customer has been deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error("There was an error deleting the customer.");
      console.error("Error deleting customer:", error);
    }
  };

  const handleEdit = (customerId) => {
    // Display a toast message on edit click
    toast.info(`Edit customer with ID: ${customerId}`);
  };

  const handleRedirect = (customerId) => {
    router.push(`/dashboard/users/${customerId}`);
  };

  return (
    <div>
      {customerDetails.map((customer) => (
        <Card key={customer.id} className="m-4">
          <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
            <div className="space-y-1">
              <CardTitle>
                <span
                  className="cursor-pointer"
                  onClick={() => handleRedirect(customer.id)}
                >
                  {customer.name || "Unnamed Customer"}
                </span>{" "}
                <span>{customer.icon}</span>
              </CardTitle>
              <CardDescription>{customer.email || "No email"}</CardDescription>
            </div>
            <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
              <EditCustomerSheet customer={customer} />
              <Separator orientation="vertical" className="h-[20px]" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" className="px-2 shadow-none">
                    <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  alignOffset={-5}
                  className="w-[200px]"
                  forceMount
                >
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => handleDelete(customer.id)}>
                    <TrashIcon className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusIcon className="mr-2 h-4 w-4" /> Placeholder
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Tag className="mr-1 h-3 w-3 " />
                {customer.userId}
              </div>
              <div className="flex items-center">
                <StarIcon className="mr-1 h-3 w-3" />
                Placeholder
              </div>
              <div>
                {format(new Date(customer.createdAt), "dd.MM.yyyy HH:mm")}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
