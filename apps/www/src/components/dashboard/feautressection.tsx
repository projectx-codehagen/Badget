import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import { Balancer } from "react-wrap-balancer";

const features = [
  {
    name: "Revolutionizing Real Estate: AI-Powered Listings",
    description:
      "Instantly draft standout property listings with our advanced AI editor, designed to captivate and attract potential buyers through eloquent, detail-rich descriptions.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Elevate Your Realty Game with Propwrite",
    description:
      "Empower your real estate business with Propwrite's SSL encryption, ensuring that all client information and property data are secure and protected.",
    icon: LockClosedIcon,
  },
  {
    name: "Next-Gen Property Management: AI Meets Real Estate",
    description:
      "Our platform simplifies property management by automating follow-ups and updates, freeing you to focus on what you do best – closing deals.",
    icon: ArrowPathIcon,
  },
  {
    name: "AI-Enhanced Listings for Smart Agents",
    description:
      "Stay ahead of security threats with real-time monitoring and automatic updates, safeguarding your listings with the latest in AI technology.",
    icon: FingerPrintIcon,
  },
  {
    name: "Maximize Sales with Intelligent Real Estate Solutions",
    description:
      "Integrate Propwrite's comprehensive API with your current tools for a seamless experience that enhances your workflow and maximizes efficiency.",
    icon: Cog6ToothIcon,
  },
  {
    name: "Unlock Real Estate Potential with AI Efficiency",
    description:
      "Ensure your listings are always current and never lost with our reliable backup solutions, providing peace of mind and data security.",
    icon: ServerIcon,
  },
];

export default function Featuressection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            <span className="relative bg-gradient-to-r from-indigo-500 to-purple-500/80 bg-clip-text font-extrabold text-transparent">
              Propwrite
            </span>
          </h2>

          <h1
            className="animate-fade-up font-urban text-3xl font-extrabold tracking-tight opacity-0 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>Streamlined Real Estate Efficiency</Balancer>
          </h1>

          <p
            className="mt-4 max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Propwrite redefines property listing management with
              state-of-the-art AI, delivering unparalleled efficiency and
              precision. Experience the future of real estate—where technology
              enhances every transaction, every client interaction, and every
              sale
            </Balancer>
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <img
            src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
            alt="App screenshot"
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            width={2432}
            height={1442}
          />
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline text-sm font-semibold">
                <feature.icon
                  className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                  aria-hidden="true"
                />
                <Balancer>{feature.name}</Balancer>
              </dt>
              <dd
                className="mt-2 animate-fade-up leading-normal text-muted-foreground opacity-0"
                style={{
                  animationDelay: "0.35s",
                  animationFillMode: "forwards",
                }}
              >
                <Balancer>{feature.description}</Balancer>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
