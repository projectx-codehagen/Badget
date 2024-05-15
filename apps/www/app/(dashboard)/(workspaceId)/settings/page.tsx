import { api } from "@/trpc/server";

import { Separator } from "@/components/ui/separator";

import ProfileForm from "./profile-form";

// This is how you can fetch data from the API - EXAMPLE
// async function fetchAndLogAssets() {
//   try {
//     const assets = await api.account.getAllAccounts.query();
//     console.log("Assets:", assets);
//   } catch (error) {
//     console.error("Failed to fetch assets:", error);
//   }
// }

// fetchAndLogAssets();

// const assets = await api.asset.getAllAssets.query();
// console.log(assets);
// const accounts = await api.account.getAllAccounts.query();
// console.log(accounts);

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
