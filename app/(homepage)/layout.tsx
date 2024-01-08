
import { getCurrentUser } from "@/lib/session";

import { Header } from './Header';
import { Footer } from './Footer';

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
        <main>{children}</main>
        <Footer />
    </>
  );
}
