import { cn } from "@/lib/utils";
import Link from 'next/link'
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/shared/icons"
import { useSigninModal } from "@/hooks/use-signin-modal";
import useScroll from "@/hooks/use-scroll";
import { ModeToggle } from "@/components/layout/mode-toggle";

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  )
}

export const Header = () => {
    return (
        <header className="py-10">
            <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')}>
            <nav className="relative z-50 flex justify-between">
              <div className="flex items-center md:gap-x-12">
                <Link href="/" aria-label="Home">
                    <div className="w-auto flex align-baseline gap-2">
                      <Icons.logo />
                      <span className="hidden  font-semibold sm:inline-block">
                        {siteConfig.name}
                      </span>
                    </div>
                </Link>

              <div className="hidden md:flex md:gap-x-6">
                <NavLink href="#features">Features</NavLink>
                <NavLink href="/pricing">Pricing</NavLink>
                <NavLink href="/blog">Blog</NavLink>
              </div>
            </div>

            <div className="flex items-center gap-x-5 md:gap-x-8">
              <div className="hidden md:block">
                <NavLink href="/login">Sign In</NavLink>
              </div>
              <Link href="/register" className="group inline-flex items-center justify-center rounded-md py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900">
                <span>
                  Sign Up
                </span>
              </Link>
              <ModeToggle />
              <div className="-mr-1 md:hidden">
                {/* <MobileNavigation /> */}
              </div>
            </div>
          </nav>  
        </div>
      </header>
    )
}