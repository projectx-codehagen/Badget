import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { getFonts } from "@/lib/og/utils";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

// Route segment config
export const runtime = "edge";
export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const { calSansFontData, interFontData } = await getFonts();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          fontFamily: '"Inter"',
        }}
        tw="bg-white text-black px-16 py-8"
      >
        <div tw="flex space-y-6 pb-12 py-28">
          <div tw="flex max-w-[64rem] flex-col items-center justify-center gap-5 text-center">
            <p
              tw={cn(
                buttonVariants({ variant: "outline" }),
                "border border-stone-300 h-10 py-2 px-4",
              )}
              style={{
                fontFamily: '"Cal Sans"',
              }}
            >
              Introducing on{" "}
              <span tw="ml-2 h-4 w-4">
                <Icons.twitter width="100%" height="100%" />
              </span>
            </p>

            <h1
              tw="font-urban font-extrabold tracking-tight text-7xl"
              style={{
                fontFamily: '"Cal Sans"',
              }}
            >
              Budget Better, Gain More Experience Badget
            </h1>

            <p tw="max-w-[42rem] text-muted-foreground text-xl leading-8">
              Empower your financial management with AI-driven insights, making
              tracking and optimizing your finances effortless.
            </p>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Cal Sans",
          data: calSansFontData,
          style: "normal",
        },
        {
          name: "Inter",
          data: interFontData,
          style: "normal",
        },
      ],
    },
  );
}
