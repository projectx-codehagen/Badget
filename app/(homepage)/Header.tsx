import { cn } from "@/lib/utils";
import Link from 'next/link'
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/shared/icons";
import { ModeToggle } from "@/components/layout/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

const MobileNavigation = () => {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger>
        <svg
          aria-hidden="true"
          className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <path
            d="M0 1H14M0 7H14M0 13H14"
            className="origin-center transition"
          />
          <path
            d="M2 2L12 12M12 2L2 12"
            className="origin-center transition scale-90 opacity-0"
          />
        </svg>
      </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>
        <Link href="#features">Features</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/pricing">Pricing</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/blog">Blog</Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export const Header = () => {
    return (
        <header className="py-8 sticky top-0 z-40 bg-background/60 backdrop-blur-xl transition-all">
          <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8')}>
            <nav className="relative z-50 flex justify-between">
              <div className="flex items-center md:gap-x-12">
                <Link href="/" aria-label="Home">
                    <div className="w-auto flex align-baseline gap-2">
                      <Icons.logo />
                      <span className="font-semibold inline-block">
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
              <div className="hidden md:block">
                <ModeToggle />
              </div>
              <div className="md:hidden">
                <MobileNavigation />
              </div>
            </div>
          </nav>  
        </div>
      </header>
    )
}