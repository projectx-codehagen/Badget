import { RouterOutputs } from "@projectx/api";
import { ConnectorStatus } from "@projectx/db";

import BlurImage from "@/lib/blur-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { ConnectorConfigForm } from "./connector-config-form";

type ConnectorWithConfig =
  RouterOutputs["connectors"]["listConnectors"][number];

type ConnectorCardsProps = {
  connectorsWithConfig: ConnectorWithConfig[];
};

export function ConnectorCards({ connectorsWithConfig }: ConnectorCardsProps) {
  return (
    <>
      {connectorsWithConfig.map((connectorWithConfig, index) => (
        <Card className="mb-4 w-[350px]" key={index}>
          <CardHeader className="grid grid-cols-2 items-center gap-4">
            <div className="mt-2 space-y-1">
              <CardTitle>{connectorWithConfig.name}</CardTitle>
            </div>
            <div className="flex justify-end">
              <Badge
                variant={
                  connectorWithConfig.status === ConnectorStatus.ACTIVE
                    ? "default"
                    : connectorWithConfig.status === ConnectorStatus.BETA
                      ? "secondary"
                      : connectorWithConfig.status === ConnectorStatus.DEV
                        ? "destructive"
                        : "destructive"
                }
              >
                {connectorWithConfig.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="flex justify-center">
              <BlurImage
                src={connectorWithConfig?.logoUrl ?? ""} // TODO: put default image here
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
                    connectorWithConfig.status === ConnectorStatus.ACTIVE
                      ? "outline"
                      : connectorWithConfig.status === ConnectorStatus.BETA
                        ? "secondary"
                        : "outline"
                  }
                  className="w-full"
                >
                  See Config
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add connector config</SheetTitle>
                  <SheetDescription>
                    Add you bank connector to display the right information
                  </SheetDescription>
                </SheetHeader>

                <ConnectorConfigForm
                  connectorConfig={connectorWithConfig.connectorConfig}
                />

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
