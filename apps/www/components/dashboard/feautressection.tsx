import Image from "next/image";
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
    name: "Revolutionizing Finance: AI-Powered Analysis",
    description:
      "Harness advanced AI to analyze financial trends and patterns, offering you actionable insights for smarter decision-making.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Secure Your Finances with Projectx",
    description:
      "Protect your financial data with top-tier encryption, ensuring your sensitive information is safe from unauthorized access.",
    icon: LockClosedIcon,
  },
  {
    name: "Automate Your Finances: AI and Efficiency",
    description:
      "Streamline your financial management with AI-driven automation for bill payments, budget tracking, and more.",
    icon: ArrowPathIcon,
  },
  {
    name: "Stay Ahead with AI-Enhanced Financial Monitoring",
    description:
      "Get real-time updates and security alerts on your financial portfolio, keeping you informed and proactive.",
    icon: FingerPrintIcon,
  },
  {
    name: "Seamless Integration Financial Ecosystem",
    description:
      "Easily connect Projectx with your existing financial tools for a unified and efficient financial management experience.",
    icon: Cog6ToothIcon,
  },
  {
    name: "Reliable Financial Data Management with Projectx",
    description:
      "Access your financial data anytime, anywhere, with our secure cloud backup and recovery solutions.",
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
              Projectx
            </span>
          </h2>

          <h1
            className="animate-fade-up font-urban text-3xl font-extrabold tracking-tight opacity-0 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>Revolutionize Your Financial Management</Balancer>
          </h1>

          <p
            className="mt-4 max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Projectx reimagines financial tracking and optimization with
              leading-edge AI, offering a new era of precision and ease in
              personal finance.
            </Balancer>
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Image
            src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
            alt="App screenshot"
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            width={2432}
            height={1442}
          />
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-background pt-[7%]" />
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
