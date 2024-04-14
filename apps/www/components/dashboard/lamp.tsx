import Image from "next/image";
import { LockClosedIcon } from "@radix-ui/react-icons";
import {
  ArrowUpIcon,
  CloudDownload,
  CogIcon,
  FingerprintIcon,
  ServerIcon,
} from "lucide-react";
import { Balancer } from "react-wrap-balancer";

import { LampTemplate } from "../ui/lamp";
import { BentoGridTemplate } from "./bentogrid/bentogrid";

export default function LampSection() {
  return <LampTemplate />;
}
