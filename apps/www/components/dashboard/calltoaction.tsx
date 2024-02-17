import { Balancer } from "react-wrap-balancer";

import { GetStartedButton } from "../buttons/GetStartedButton";

const CallToActionComponent = () => {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h2
        className="animate-fade-up font-urban text-3xl font-extrabold tracking-tight opacity-0 sm:text-4xl md:text-5xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <Balancer>Boost your productivity today</Balancer>
      </h2>
      <p
        className="mt-2 animate-fade-up leading-normal text-muted-foreground opacity-0"
        style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
      >
        <Balancer>
          Streamline your property listings and client interactions with the
          precision of AI. Badget delivers a suite of tools that elevate your
          efficiency and let you focus on closing deals – not on paperwork.
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

export default CallToActionComponent;
