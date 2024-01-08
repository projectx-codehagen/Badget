import { Balancer } from "react-wrap-balancer";

import { GetStartedButton } from "../buttons/GetStartedButton";

export const CallToAction = () => {
  return (
    <div className="container mx-auto px-6 py-20 text-center">
      <h2
        className="animate-fade-up font-urban text-3xl font-extrabold tracking-tight opacity-0 sm:text-4xl md:text-5xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <Balancer>Make Smarter Financial Decisions</Balancer>
      </h2>
      <p
        className="mt-2 animate-fade-up leading-normal text-muted-foreground opacity-0"
        style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
      >
        <Balancer>
          Get easy, personalized advice to manage your spending, saving, and investing effectively. With just a few clicks, gain insights that lead to better financial choices. 
          Start now and take a step towards a more secure financial life.
        </Balancer>
      </p>
      <div
        className="mt-8 flex animate-fade-up justify-center space-x-2 opacity-0"
        style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
      >
        <GetStartedButton />
      </div>
    </div>
  );
};
