import { CalendarIcon, FileTextIcon, InputIcon } from "@radix-ui/react-icons";
import { BellIcon, MapIcon, Share2Icon } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@dingify/ui/components/command";

import { cn } from "@/lib/utils";

import { AnimatedBeamMultipleOutputDemo } from "./animated-beam-multiple-outputs";
import { AnimatedListLanding } from "./animated-list-landing";
import { BentoCard, BentoGrid } from "./bento-grid";
import Marquee from "./marquee";

const files = [
  {
    name: "First seen",
    body: "The first time a user was seen in the app. This is the first event that was recorded for the user.",
  },
  {
    name: "Most used event",
    body: "The event that the user has triggered the most. This is the event that the user has triggered the most.",
  },
  {
    name: "Last Seen",
    body: "The last time a user was seen in the app. This is the last event that was recorded for the user.",
  },
  {
    name: "Events over time",
    body: "The number of events that the user has triggered over time. This is the number of events that the user has triggered over time.",
  },
  {
    name: "Customer status",
    body: "The status of the customer. How many time has the customer used your application",
  },
];

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

const features = [
  {
    Icon: MapIcon,
    name: "See users journey",
    description: "Understand how users interact with your app.",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: InputIcon,
    name: "Get the information you need",
    description: "Search through all your events fast",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Command className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>User-123</CommandItem>
            <CommandItem>Most used events</CommandItem>
            <CommandItem>Analytics</CommandItem>
            <CommandItem>All events</CommandItem>
            <CommandItem>keys.gpg</CommandItem>
            <CommandItem>seed.txt</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "/",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when somone uses your SDK",
    className: "col-span-3 lg:col-span-1",
    href: "/",
    cta: "Learn more",
    background: (
      <AnimatedListLanding className="absolute right-2 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105 md:h-[150px] md:w-[300px]" />
    ),
  },
];

export function BentoSectionLanding() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
