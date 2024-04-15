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
import { MovingButton } from "../ui/moving-borders";
import { BentoGridTemplate } from "./bentogrid/bentogrid";

export default function LampSection() {
  return (
    <div>
      <LampTemplate />
    </div>
  );
}
