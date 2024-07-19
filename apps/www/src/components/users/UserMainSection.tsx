import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";

import { Badge } from "@dingify/ui/components/badge";
import { Button } from "@dingify/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from "@dingify/ui/components/input";
import { Label } from "@dingify/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dingify/ui/components/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@dingify/ui/components/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dingify/ui/components/table";
import { Textarea } from "@dingify/ui/components/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@dingify/ui/components/tooltip";

import { UserChartActivity } from "./UserChartActivity";
import UserEmailCard from "./UserEmailCard";
import { UserGridActivity } from "./UserGridActivity";
import { UserPowerCard } from "./UserPowerCard";
import UsersDashboardTable from "./UsersDashboardTable";

export function UserMainSection({ customerDetails }) {
  console.log(customerDetails)
  return (
    <div className="">
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <UsersDashboardTable customerDetails={customerDetails} />
          <UserChartActivity />
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <UserPowerCard customerDetails={customerDetails} />
          <UserGridActivity dings={customerDetails.events} />
          <UserEmailCard customerDetails={customerDetails} />
        </div>
      </div>
    </div>
  );
}
