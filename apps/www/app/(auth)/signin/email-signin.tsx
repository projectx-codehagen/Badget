"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSignIn, useSignUp } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/shared/icons";

export function EmailSignIn() {
  const [isLoading, setIsLoading] = React.useState(false);

  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const router = useRouter();
  const { toast } = useToast();

  const signInWithLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    if (!signInLoaded || typeof email !== "string") return null;

    // the catch here prints out the error.
    // if the user doesn't exist we will return a 422 in the network response.
    // so push that to the sign up.
    setIsLoading(true);
    await signIn
      .create({
        identifier: email,
      })
      .catch((error) => {
        console.log("sign-in error", JSON.stringify(error));
      });

    const firstFactor = signIn.supportedFirstFactors.find(
      (f) => f.strategy === "email_link",
      // This cast shouldn't be necessary but because TypeScript is dumb and can't infer it.
    ) as { emailAddressId: string } | undefined;

    if (firstFactor) {
      const magicFlow = signIn.createEmailLinkFlow();

      setIsLoading(false);
      toast({
        title: "Email Sent",
        description: "Check your inbox for a verification email.",
      });
      const response = await magicFlow
        .startEmailLinkFlow({
          emailAddressId: firstFactor.emailAddressId,
          redirectUrl: `${window.location.origin}/`,
        })
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong, please try again.",
          });
        });

      const verification = response?.firstFactorVerification;
      if (verification?.status === "expired") {
        toast({
          variant: "destructive",
          title: "Link Expired",
          description: "Link expired, please try again.",
        });
      }

      magicFlow.cancelEmailLinkFlow();
      if (response?.status === "complete") {
        await setActive({ session: response.createdSessionId }).then(() =>
          router.push(`/dashboard`),
        );
      }
    } else {
      if (!signUpLoaded) return null;
      await signUp.create({
        emailAddress: email,
      });
      const { startEmailLinkFlow } = signUp.createEmailLinkFlow();

      setIsLoading(false);
      toast({
        title: "Email Sent",
        description: "Check your inbox for a verification email.",
      });
      const response = await startEmailLinkFlow({
        redirectUrl: `${window.location.origin}/`,
      })
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong, please try again.",
          });
        })
        .then((res) => res);

      if (response?.status === "complete") {
        await setActive({ session: response.createdSessionId }).then(() =>
          router.push(`/dashboard`),
        );
        return;
      }
    }
  };

  return (
    <form className="grid gap-2" onSubmit={signInWithLink}>
      <div className="grid gap-1">
        <Input
          name="email"
          placeholder="name@example.com"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          className="bg-background"
        />
      </div>
      <Button disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Sign In with Email
      </Button>
    </form>
  );
}
