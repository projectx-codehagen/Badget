import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export function UserAccountNav() {
  return (
    <>
      <SignedIn>
        <UserButton afterSignOutUrl={process.env.NEXT_PUBLIC_APP_URL} />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
