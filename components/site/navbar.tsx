import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"

const links = [
  { label: "Browse Jobs", href: "#" },
  { label: "Company", href: "#" },
  { label: "Pricing", href: "#" },
]

export function Logo() {
  return (
    <a href="#" className="flex items-center gap-0.5 text-lg font-bold tracking-tight text-white">
      <span>hirel</span>
      <span className="relative mx-0.5 inline-block size-3.5 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600">
        <span className="absolute inset-x-0.5 top-1/2 h-px -translate-y-1/2 rotate-[-20deg] bg-white/70" />
      </span>
      <span>op</span>
    </a>
  )
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Open menu"
            className="text-white/80 hover:bg-white/5 hover:text-white"
          />
        }
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="top"
        className="rounded-b-2xl border-b border-white/10 bg-[#0b0c11] pt-2 pb-6"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>

        <nav className="flex flex-col px-2">
          {links.map((link) => (
            <SheetClose
              key={link.label}
              render={<a href={link.href} className="rounded-lg px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white" />}
            >
              {link.label}
            </SheetClose>
          ))}
        </nav>

        <Separator className="my-3 bg-white/10" />

        <div className="flex gap-2 px-2">
          <SheetClose
            render={
              <Link
                href="/sign-in"
                className="flex-1 rounded-md border border-white/15 bg-transparent px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Sign In
              </Link>
            }
          />
          <SheetClose
            render={<Button className="flex-1 bg-[#6c5df9] text-white hover:bg-[#7d6efc]" />}
          >
            Get Started
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-3 z-50 px-3">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-2xl border border-white/5 bg-[#0b0c11]/90 px-4 backdrop-blur-md md:px-5">
        <Logo />

        {/* desktop */}
        <div className="hidden items-center gap-2 md:flex">
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <Separator orientation="vertical" className="mx-2 h-4 bg-white/15" />

          <Link
            href="/sign-in"
            className="rounded-md px-4 py-2 text-xs text-white/80 transition-colors hover:bg-white/5 hover:text-white"
          >
            Sign In
          </Link>
          <Button className="bg-[#6c5df9] text-white hover:bg-[#7d6efc]">Get Started</Button>
        </div>

        {/* mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <MobileMenu />
          <Button
            size="sm"
            className="bg-[#6c5df9] text-white hover:bg-[#7d6efc] sm:h-8 sm:px-2.5"
          >
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  )
}
