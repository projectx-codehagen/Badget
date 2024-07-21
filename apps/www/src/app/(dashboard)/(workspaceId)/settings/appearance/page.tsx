import { Separator } from "@dingify/ui/components/separator";

import { AppearanceForm } from "./appearance-form";

export const metadata = {
  title: "Appearance settings",
  description: "Appearance settings description",
};

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}