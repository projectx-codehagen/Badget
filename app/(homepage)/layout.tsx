import { Suspense } from "react";

import { marketingConfig } from "@/config/marketing";
import { getCurrentUser } from "@/lib/session";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";

import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';

type LayoutProps = {
  children: React.ReactNode;
}

export default async function Layout({
  children,
}: LayoutProps) {
  const user = await getCurrentUser();

  return (
    <>
        <Header />
        <Main />
        <Footer />
    </>
  );
}
