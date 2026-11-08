import {
  BriefcaseBusiness,
  Building2,
  DoorOpen,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

const stats = [
  { icon: DoorOpen, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Search, value: "2M", label: "Job Seekers" },
  { icon: Sparkles, value: "97%", label: "Satisfaction Rate" },
]

function Stars() {
  // Star positions derived purely from the index so SSR output stays stable.
  const lcg = (i: number) => (i * 16807 + 11) % 2147483647
  const stars = Array.from({ length: 70 }, (_, i) => ({
    left: `${(lcg(i) % 10000) / 100}%`,
    top: `${(lcg(i + 70) % 10000) / 100}%`,
    size: lcg(i + 140) % 10 > 8.5 ? 2.5 : 1.5,
    opacity: 0.25 + ((lcg(i + 210) % 100) / 100) * 0.55,
  }))

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}

function Globe() {
  return (
    <div
      aria-hidden
      className="absolute top-24 left-1/2 size-[900px] -translate-x-1/2 overflow-hidden rounded-full md:size-[1200px]"
      style={{
        background:
          "radial-gradient(circle at 50% 12%, rgba(129,140,248,0.55) 0%, rgba(67,74,130,0.45) 18%, #141830 42%, #0a0d18 62%, #050609 80%)",
        boxShadow:
          "0 -10px 140px 30px rgba(99,102,241,0.45), inset 0 60px 160px rgba(129,140,248,0.35)",
      }}
    >
      {/* dotted texture */}
      <div className="absolute inset-0 rounded-full opacity-50 [background-image:radial-gradient(rgba(199,210,254,0.30)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(circle_at_50%_10%,black,transparent_38%)]" />

      {/* soft landmasses */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 1200 1200" fill="none">
        <defs>
          <filter id="landmass" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <g filter="url(#landmass)" fill="#0e1526" opacity="0.9">
          <ellipse cx="440" cy="360" rx="130" ry="55" />
          <ellipse cx="560" cy="320" rx="80" ry="40" />
          <ellipse cx="660" cy="380" rx="90" ry="38" />
          <ellipse cx="760" cy="330" rx="70" ry="30" />
          <ellipse cx="380" cy="270" rx="60" ry="26" />
          <ellipse cx="520" cy="450" rx="110" ry="34" />
          <ellipse cx="700" cy="470" rx="60" ry="46" />
        </g>
      </svg>

      {/* rim light on the top edge */}
      <div className="absolute inset-x-[12%] top-0 h-40 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(199,210,254,0.35),transparent_70%)] blur-2xl" />
    </div>
  )
}

function SearchBar() {
  return (
    <div className="mx-auto mt-8 flex max-w-xl items-center gap-1 rounded-full border border-white/10 bg-[#0a0c12] p-1.5 pl-5 shadow-[0_0_60px_rgba(99,102,241,0.15)]">
      <Search className="size-4 shrink-0 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Job title, skill or company"
        className="h-9 border-0 bg-transparent px-3 text-sm focus-visible:ring-0 dark:bg-transparent"
      />
      <Separator orientation="vertical" className="h-6 bg-white/10" />
      <MapPin className="size-4 hidden shrink-0 text-muted-foreground sm:block" />
      <Input
        type="text"
        placeholder="Location or Remote"
        className="h-9 hidden w-40 border-0 bg-transparent px-2 text-sm focus-visible:ring-0 dark:bg-transparent sm:block"
      />
      <Button
        aria-label="Search"
        className="size-10 shrink-0 rounded-xl bg-[#6c5df9] text-white hover:bg-[#7d6efc]"
      >
        <Search className="size-4" />
      </Button>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-3xl px-4 pt-16 text-center md:pt-24">
        <div className="flex items-center justify-center gap-3">
          <span className="hidden h-px w-20 bg-gradient-to-r from-transparent to-white/25 md:block" />
          <Badge
            variant="outline"
            className="h-auto gap-2 rounded-full border-white/10 bg-[#0a0c12] px-4 py-2 text-xs tracking-widest text-muted-foreground uppercase"
          >
            <BriefcaseBusiness className="size-3.5 text-orange-500" />
            <span>
              <strong className="mr-1 font-semibold text-white">50,000+</strong>
              New jobs this month
            </span>
          </Badge>
          <span className="hidden h-px w-20 bg-gradient-to-l from-transparent to-white/25 md:block" />
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
          Find Your Dream Job Today
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-balance text-white/60 md:text-base">
          HireLoop connects top talent with world-class companies. Browse thousands of curated
          opportunities and land your next role — faster.
        </p>

        <SearchBar />

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-white/50">Trending</span>
          {trending.map((item) => (
            <Badge
              key={item}
              variant="outline"
              className="rounded-full border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70"
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>

      {/* globe + stats */}
      <div className="relative mt-10 h-[430px] md:h-[540px]">
        <Stars />
        <div
          aria-hidden
          className="absolute top-6 left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[110px] md:size-[760px]"
        />
        <Globe />

        <p className="absolute inset-x-0 top-[46%] z-10 mx-auto max-w-md px-4 text-center text-2xl font-medium text-balance text-white md:max-w-lg md:text-3xl">
          Assisting over{" "}
          <span className="text-[#8fb0ff]">15,000 job seekers</span> find their dream positions.
        </p>

        <div className="absolute inset-x-0 bottom-4 z-10 mx-auto grid max-w-5xl grid-cols-2 gap-3 px-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex h-24 flex-col items-start justify-between rounded-xl border border-white/10 bg-[#0a0c12]/80 p-4 backdrop-blur-md md:h-28"
            >
              <stat.icon className="size-4 text-white/40" />
              <div>
                <div className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
