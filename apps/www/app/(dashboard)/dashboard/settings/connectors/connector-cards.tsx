import Image from "next/image";

import BlurImage from "@/lib/blur-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Define the connectors array with example data
const connectors = [
  {
    name: "Plaid",
    status: "Active",
    logo: "/images/logo/PlaidLogo.svg",
    button: "Add",
  },
  {
    name: "Saltedge",
    status: "Beta",
    logo: "/images/logo/SaltedgeLogo.svg",
    button: "Request access",
  },
  {
    name: "Test",
    status: "Dev",
    logo: "/images/logo/PlaidLogo.svg",
    button: "Add",
  },
  // Add more connector objects as needed
];

//TODO Zod schema for connector form - Se template below

// Zod schema for connector form
// const connectorFormSchema = z.object({
//     name: z.string().min(1, "Name is required"),
//     // Add more fields as needed
//   });

//   export function ConnectorCards() {
//     const form = useForm<ConnectorFormValues>({
//       resolver: zodResolver(connectorFormSchema),
//       mode: "onChange",
//     });

//     const onSubmit = (data: ConnectorFormValues) => {
//       console.log(data); // Handle form submission
//       toast({ title: "Connector added!" }); // Adjust toast implementation as needed
//     };

export function ConnectorCards() {
  return (
    <>
      {connectors.map((connector, index) => (
        <Card className="mb-4 w-[350px]" key={index}>
          <CardHeader className="grid grid-cols-2 items-center gap-4">
            <div className="mt-2 space-y-1">
              <CardTitle>{connector.name}</CardTitle>
            </div>
            <div className="flex justify-end">
              <Badge
                variant={
                  connector.status === "Active"
                    ? "default"
                    : connector.status === "Beta"
                      ? "secondary"
                      : connector.status === "Dev"
                        ? "destructive"
                        : "destructive"
                }
              >
                {connector.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="flex justify-center">
              <BlurImage
                src={connector.logo}
                width={100}
                height={100}
                alt="404"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant={
                    connector.button === "Add"
                      ? "outline"
                      : connector.button === "Request access"
                        ? "secondary"
                        : "outline"
                  }
                  className="w-full"
                >
                  {connector.button}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add connector config</SheetTitle>
                  <SheetDescription>
                    Add you bank connector to display the right information
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" value="Plaid" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Placeholder
                    </Label>
                    <Input id="username" value="Value" className="col-span-3" />
                  </div>
                  <Separator />
                  <SheetTitle>Config</SheetTitle>
                  <SheetDescription>
                    You need to add your credentials that you use on bank
                    provider.
                  </SheetDescription>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Link
                    </Label>
                    <Input id="username" value="Value" className="col-span-3" />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Create</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
