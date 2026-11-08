import { Hero } from "@/components/site/hero"
import { Navbar } from "@/components/site/navbar"

export default function Page() {
  return (
    <div className="dark min-h-svh bg-[#04050a] text-foreground">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}
