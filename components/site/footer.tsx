const columns = [
  {
    title: "Product",
    links: ["Job discovery", "Worker AI", "Companies", "Salary data"],
  },
  {
    title: "Navigations",
    links: ["Help center", "Career library", "Contact"],
  },
  {
    title: "Resources",
    links: ["Brand Guideline", "Newsroom"],
  },
]

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.45-4.92 8.45-9.94Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor">
      <path d="M4.98 3.5a2.49 2.49 0 1 1 0 4.98 2.49 2.49 0 0 1 0-4.98ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" />
    </svg>
  )
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor">
      <path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.9 1.42 5.49 3.65 7.18V22l3.35-1.84c.93.26 1.94.4 3 .4 5.52 0 10-4.14 10-9.25S17.52 2 12 2Zm1.09 12.4-2.55-2.72-4.98 2.72 5.48-5.82 2.61 2.72 4.92-2.72-5.48 5.82Z" />
    </svg>
  )
}

// Faded "cityscape" band along the top edge of the footer.
const buildings = [
  { x: 0, w: 44, h: 34 },
  { x: 50, w: 30, h: 56 },
  { x: 86, w: 52, h: 26 },
  { x: 144, w: 26, h: 44 },
  { x: 176, w: 40, h: 62 },
  { x: 222, w: 34, h: 22 },
  { x: 262, w: 48, h: 40 },
  { x: 316, w: 28, h: 66 },
  { x: 350, w: 44, h: 30 },
  { x: 400, w: 32, h: 48 },
  { x: 438, w: 50, h: 24 },
  { x: 494, w: 36, h: 58 },
  { x: 536, w: 46, h: 34 },
  { x: 588, w: 30, h: 50 },
  { x: 624, w: 42, h: 26 },
  { x: 672, w: 52, h: 44 },
  { x: 730, w: 34, h: 60 },
  { x: 770, w: 46, h: 28 },
  { x: 822, w: 30, h: 40 },
  { x: 858, w: 50, h: 54 },
  { x: 914, w: 36, h: 30 },
  { x: 956, w: 44, h: 46 },
  { x: 1006, w: 30, h: 62 },
  { x: 1042, w: 48, h: 32 },
  { x: 1096, w: 34, h: 48 },
  { x: 1136, w: 46, h: 26 },
]

function Skyline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full text-white/[0.045] [mask-image:linear-gradient(to_bottom,black_10%,transparent)]"
    >
      <g fill="currentColor">
        {buildings.map((building, i) => (
          <rect
            key={i}
            x={building.x}
            y={0}
            width={building.w}
            height={building.h}
            rx={2}
          />
        ))}
      </g>
    </svg>
  )
}

function FooterLogo() {
  return (
    <a href="#" className="flex items-center gap-0.5 text-lg font-bold tracking-tight">
      <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
        hirel
      </span>
      <span className="relative mx-0.5 inline-block size-3.5 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600">
        <span className="absolute inset-x-0.5 top-1/2 h-px -translate-y-1/2 rotate-[-20deg] bg-white/70" />
      </span>
      <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
        op
      </span>
    </a>
  )
}

const socials = [
  { label: "Facebook", icon: FacebookIcon },
  { label: "Messenger", icon: MessengerIcon },
  { label: "LinkedIn", icon: LinkedinIcon },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#04050a]">
      <Skyline />

      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-16 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div className="max-w-xs">
            <FooterLogo />
            <p className="mt-4 text-sm leading-relaxed text-white/40">
              The AI-native career platform. Built for people who take their work
              seriously.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-medium text-[#8b85f8]">{column.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/5 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="flex size-8 items-center justify-center rounded-lg border border-white/5 bg-[#14151d] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <social.icon />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-xs text-white/40 sm:flex-row sm:items-center sm:gap-8">
            <span>Copyright 2024 – Programming Hero</span>
            <span className="flex items-center gap-1.5">
              <a href="#" className="text-white/60 transition-colors hover:text-white">
                Terms &amp; Policy
              </a>
              <span aria-hidden>-</span>
              <a href="#" className="text-white/60 transition-colors hover:text-white">
                Privacy Guideline
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
