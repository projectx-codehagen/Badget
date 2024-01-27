"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/dist/types/server";

import { siteConfig } from "@/config/site";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
import { Modal } from "@/components/shared/modal";

import { useToast } from "../ui/use-toast";

export const SignInModal = () => {
  const [isLoading, setIsLoading] = useState<OAuthStrategy | null>(null);
  const [signInClicked, setSignInClicked] = useState(false);
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const signInModal = useSigninModal();
  const { toast } = useToast();

  const oauthSignIn = async (provider: OAuthStrategy) => {
    if (!signInLoaded) return null;
    try {
      setIsLoading(provider);
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (cause) {
      console.error(cause);
      setIsLoading(null);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong, please try again.",
      });
    }
  };

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <a href={siteConfig.url}>
            <Icons.logo className="h-10 w-10" />
          </a>
          <h3 className="font-urban text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Unlock AI-Powered Money Management. Sign in seamlessly with your
            Google account with one simple click to access tailored financial
            insights, customized budget tracking and spending analysis from
            ProjectX.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          <Button
            variant="default"
            disabled={signInClicked}
            onClick={() => {
              setSignInClicked(true);
              oauthSignIn("oauth_google").then(() =>
                // TODO: fix this without setTimeOut(), modal closes too quickly. Idea: update value before redirect
                setTimeout(() => {
                  signInModal.onClose();
                }, 1000),
              );
            }}
          >
            {signInClicked ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}{" "}
            Sign In with Google
          </Button>
        </div>
      </div>
    </Modal>
  );
};
