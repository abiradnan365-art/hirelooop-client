import Link from "next/link"

import { Button } from "@/components/ui/button"

// Wireframe grid drawn inside the dome (ellipses sharing one center).
const meridians = [40, 120, 200, 280, 360, 440]
const parallels = [100, 200, 300, 400, 480]

function Dome() {
  return (
    <div
      aria-hidden
      className="absolute top-24 left-1/2 size-[1200px] -translate-x-1/2 overflow-hidden rounded-full md:size-[1500px]"
      style={{
        background:
          "radial-gradient(circle at 50% 18%, rgba(129,132,248,0.85) 0%, rgba(88,80,215,0.65) 22%, rgba(49,46,129,0.55) 42%, #151527 68%, #050609 88%)",
        boxShadow:
          "0 -6px 120px 10px rgba(99,102,241,0.35), inset 0 40px 120px rgba(199,205,254,0.25)",
      }}
    >
      <svg
        viewBox="0 0 1000 1000"
        className="absolute inset-0 size-full"
        fill="none"
      >
        <g stroke="rgba(255,255,255,0.16)" strokeWidth="1">
          {/* meridians (vertical arcs) */}
          {meridians.map((rx) => (
            <ellipse key={`m-${rx}`} cx="500" cy="500" rx={rx} ry="500" />
          ))}
          {/* parallels (horizontal arcs) */}
          {parallels.map((ry) => (
            <ellipse key={`p-${ry}`} cx="500" cy="500" rx="500" ry={ry} />
          ))}
        </g>
      </svg>

      {/* soften the grid near the horizon */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_12%,transparent_0%,transparent_35%,rgba(5,6,9,0.55)_75%)]" />
    </div>
  )
}

export function Cta() {
  return (
    <section className="relative mt-20 h-[400px] overflow-hidden md:h-[480px]">
      <Dome />

      <div className="relative z-10 mx-auto flex h-full max-w-2xl flex-col items-center justify-center px-4 pb-16 text-center">
        <h2 className="text-4xl font-medium tracking-tight text-white md:text-5xl md:leading-[1.15]">
          Your next role is
          <br />
          already looking for you
        </h2>
        <p className="mt-4 text-sm text-white/60 md:text-base">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/sign-up">
            <Button
             
              className="h-10 w-full rounded-lg px-5 text-sm text-white bg-blue-700 hover:bg-blue-600  md:w-auto"
           
          >
            Create a free account
          </Button>
          </Link>
          <Link href="/#">
          <Button
            variant="outline"
            
            className="h-10 rounded-lg border-white/10 bg-[#12141c] px-5 text-sm text-white hover:bg-white/5"
          >
            View pricing
          </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
