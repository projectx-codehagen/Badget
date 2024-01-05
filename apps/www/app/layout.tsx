import "@/styles/globals.css";

import { Metadata } from "next";
import { fontHeading, fontSans, fontUrban } from "@/apps/www/assets/fonts";
import { Analytics } from "@/apps/www/components/analytics";
import { ModalProvider } from "@/apps/www/components/modal-provider";
import { Providers } from "@/apps/www/components/providers";
import { TailwindIndicator } from "@/apps/www/components/tailwind-indicator";
import { Toaster } from "@/apps/www/components/ui/toaster";
import { siteConfig } from "@/apps/www/config/site";
import { EdgeStoreProvider } from "@/apps/www/lib/edgestore";
import { cn } from "@/apps/www/lib/utils";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Projectx keywords"],
  authors: [
    {
      name: "christer",
    },
  ],
  creator: "codehagen",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@codehagen",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable,
        )}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
          <Analytics />
          <Toaster />
          <ModalProvider />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
