import Link from "next/link"

import { Logo } from "@/components/site/navbar"

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="dark flex min-h-svh flex-col bg-[#04050a] text-foreground">
      <header className="flex items-center justify-between px-6 py-5 md:px-10">
        <Logo />
        <Link
          href="/"
          className="text-xs text-white/60 transition-colors hover:text-white"
        >
          ← Back to home
        </Link>
      </header>

      <main className="grid flex-1 place-items-center px-4 pb-16">
        {children}
      </main>
    </div>
  )
}
