import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import { ServiceIcon } from "../ServiceIcon";
import { Eyebrow, Reveal } from "../ui";

export function Services() {
  return (
    <section id="services" className="relative bg-mist-50 py-28 sm:py-36">
      <div className="absolute inset-0 bg-dots mask-fade-b opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow tone="light" index="01">
              What we do
            </Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-extrabold tracking-[-0.025em] text-navy sm:text-5xl lg:text-6xl">
              Four disciplines.
              <br />
              One standard of excellence.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink">
              From the storage engine to the boardroom dashboard, we cover the whole data lifecycle. We run it,
              architect it, move it and teach it, without handing you between specialists.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Link
                href={`/services/${s.slug}`}
                className="group relative flex h-full flex-col overflow-hidden bg-white p-8 ring-1 ring-navy/10 transition-colors duration-500 ease-out-expo hover:bg-navy sm:p-10 clip-bevel"
              >
                {/* teal rule that extends on hover */}
                <span className="absolute top-0 left-0 h-1 w-16 bg-teal transition-all duration-700 ease-out-expo group-hover:w-full" />
                {/* giant index */}
                <span
                  className="pointer-events-none absolute -right-2 -bottom-10 font-display text-[11rem] leading-none font-extrabold text-navy/[0.04] transition-colors duration-500 group-hover:text-white/[0.05]"
                  aria-hidden
                >
                  {s.index}
                </span>

                <div className="flex items-start justify-between">
                  <span className="flex size-14 items-center justify-center bg-navy text-teal transition-colors duration-500 group-hover:bg-teal group-hover:text-navy clip-bevel-sm">
                    <ServiceIcon icon={s.icon} className="size-6" />
                  </span>
                  <span className="font-mono text-xs text-teal-deep transition-colors group-hover:text-white/70">
                    /{s.index}
                  </span>
                </div>

                <p className="mt-10 label-caps text-teal-deep transition-colors group-hover:text-teal">{s.kicker}</p>
                <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-navy transition-colors group-hover:text-white sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-ink transition-colors group-hover:text-white/70">
                  {s.summary}
                </p>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {s.platforms.map((p) => (
                    <li
                      key={p.key}
                      className="rounded-full border border-navy/15 px-3 py-1 text-xs font-medium text-navy/80 transition-colors group-hover:border-white/20 group-hover:text-white/80"
                    >
                      {p.short}
                    </li>
                  ))}
                </ul>

                <span className="relative mt-auto inline-flex items-center gap-2 pt-10 font-display text-sm font-bold text-navy transition-colors group-hover:text-teal">
                  Explore {s.title.toLowerCase()}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
