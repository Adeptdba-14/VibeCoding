import { ArrowUpRight, Compass, GraduationCap, LineChart, ShieldCheck } from "lucide-react";
import { mapsUrl, site } from "@/lib/site";
import { Mark } from "../Logo";
import { Eyebrow, Reveal } from "../ui";

const principles = [
  {
    icon: Compass,
    title: "Vendor-neutral",
    body: "Our advice follows your requirements, not a partner quota. We recommend what fits.",
  },
  {
    icon: LineChart,
    title: "Evidence-led",
    body: "Every recommendation is backed by measurements. Every change is verified before and after.",
  },
  {
    icon: ShieldCheck,
    title: "Production-grade",
    body: "Security, recoverability and change control are designed in from the first day.",
  },
  {
    icon: GraduationCap,
    title: "Knowledge transfer",
    body: "We document, teach and mentor, so your team owns the outcome.",
  },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow tone="light" index="06">
              About AdeptTech
            </Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-extrabold tracking-[-0.025em] text-navy sm:text-5xl">
              Built by practitioners, for teams that can’t afford downtime.
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink">
              <p>
                {site.name} is a London-based technology consultancy specialising in the data layer: the
                databases, cloud platforms and pipelines that every critical application depends on.
              </p>
              <p>
                We bring deep, hands-on expertise across Oracle, Microsoft SQL Server, MySQL and PostgreSQL, and
                across AWS, Microsoft Azure and Oracle Cloud Infrastructure. That breadth lets us solve problems
                that cut across technologies, such as cross-engine migrations, hybrid estates and multi-cloud data
                platforms, with one accountable team.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden bg-navy/10 ring-1 ring-navy/10 sm:grid-cols-2">
            {principles.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.06} className="bg-white p-7">
                <Icon className="size-6 text-teal-deep" strokeWidth={1.75} aria-hidden />
                <h3 className="mt-5 font-display text-lg font-extrabold text-navy">{title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15} className="lg:col-span-5">
          <div className="sticky top-28">
            <div className="relative overflow-hidden bg-navy p-8 text-white clip-bevel sm:p-10">
              <MapGraphic />
              <div className="relative">
                <p className="label-caps text-teal">Find us</p>
                <address className="mt-6 font-display text-2xl leading-snug font-bold not-italic">
                  {site.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                  <span className="block">{site.address.city}</span>
                  <span className="mt-1 block text-teal">{site.address.postcode}</span>
                </address>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-8 inline-flex items-center gap-2 border-b border-teal/50 pb-1 text-sm font-semibold text-white hover:border-teal"
                >
                  Get directions
                  <ArrowUpRight className="size-4 text-teal transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 bg-mist p-6 clip-bevel-sm">
              <Mark className="h-8 w-auto shrink-0" />
              <p className="text-sm leading-relaxed text-ink">
                <span className="font-semibold text-navy">{site.legalName}</span>
                <br />
                Technology consultancy · London, United Kingdom
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Abstract street-grid with a pulsing location marker. */
function MapGraphic() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 400 420" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="mapfade" cx="75%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="mapmask">
          <rect width="400" height="420" fill="url(#mapfade)" />
        </mask>
      </defs>
      <g mask="url(#mapmask)" stroke="#ffffff" strokeOpacity="0.14" fill="none">
        {/* Thames-like curve */}
        <path d="M-20 300 C 80 260, 140 330, 230 300 S 360 220, 430 260" strokeWidth="18" stroke="#00C0AF" strokeOpacity="0.12" />
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`h${i}`} x1="0" x2="400" y1={i * 32} y2={i * 32 + (i % 3) * 6} strokeWidth={i % 4 === 0 ? 2 : 1} />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`v${i}`} y1="0" y2="420" x1={i * 32} x2={i * 32 - (i % 2) * 10} strokeWidth={i % 5 === 0 ? 2 : 1} />
        ))}
      </g>
      <g transform="translate(340 44)">
        <circle r="26" fill="#00C0AF" opacity="0.15">
          <animate attributeName="r" values="10;34;10" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.35;0;0.35" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="7" fill="#00C0AF" />
        <circle r="3" fill="#031C50" />
      </g>
    </svg>
  );
}
