import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import { Balancer } from "react-wrap-balancer";

const FeatureSection1 = () => {
  const features = [
    {
      icon: CloudArrowUpIcon,
      title: "Instant Listing Drafts",
      description:
        "Harness AI to generate captivating property listings instantly. Save time and attract more buyers with eloquent, detail-rich descriptions that stand out.",
    },
    {
      icon: LockClosedIcon,
      title: "Secure Data Handling",
      description:
        "With our robust SSL encryption, your sensitive property data and client information are safeguarded at every step.",
    },
    {
      icon: ArrowPathIcon,
      title: "Effortless Organization",
      description:
        "Manage queues of properties with ease. Our system simplifies task management, making follow-ups and updates a breeze.",
    },
    // Add the rest of your features here
  ];

  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h1
            className="animate-fade-up font-urban text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <Balancer>Streamlined Real Estate Efficiency</Balancer>
          </h1>
          <p
            className="mt-4 max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Redefine property listing management with state-of-the-art AI,
              delivering unparalleled efficiency and precision.
            </Balancer>
          </p>
        </div>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">{/* ... */}</div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature, index) => (
              <div key={index} className="relative pl-9 text-center">
                <div className="mx-auto h-12 w-12">
                  <feature.icon aria-hidden="true" />
                </div>
                <dt className="mt-4 inline text-lg font-semibold">
                  <Balancer>{feature.title}</Balancer>
                </dt>
                <dd
                  className="mt-2 animate-fade-up leading-normal text-muted-foreground opacity-0"
                  style={{
                    animationDelay: `${0.55 + index * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <Balancer>{feature.description}</Balancer>
                </dd>
                <a
                  href="#"
                  className="mt-4 inline-block text-blue-500 hover:text-blue-400"
                >
                  Learn more →
                </a>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection1;
