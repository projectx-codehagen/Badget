import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GetStartedButton } from "@/components/buttons/GetStartedButton";
import { BusinessLine } from "@/components/dashboard/businessline";
import { CallToAction } from "@/components/dashboard/calltoaction";

import Featuressection from "@/components/dashboard/feautressection";

export const Main = () => {
    return (
        <>
            <section className="space-y-6 pb-12 pt-16 lg:py-28">
        <div className="container flex max-w-[64rem] flex-col items-center gap-5 text-center">
          <h1
            className="animate-fade-up font-urban text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Budget Better, Gain More Experience{" "}
              <span className="relative bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text font-extrabold text-transparent">
                Projectx
              </span>
            </Balancer>
          </h1>

          <p
            className="max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Empower your financial management with AI-driven insights, making
              tracking and optimizing your finances effortless.
            </Balancer>
          </p>

          <div
            className="flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <GetStartedButton />
            <Link
              href="#features"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "px-4",
              )}
            >
              <p>
                <span className="hidden sm:inline-block">Let&apos;s explore</span>{" "}
                Projectx{" "}
              </p>
            </Link>
          </div>
        </div>
      </section>
      <BusinessLine />
      <section id="features">
        <Featuressection />
      </section>
      <section>
        <CallToAction />
      </section>
    </>
    )
}