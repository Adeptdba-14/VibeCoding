"use client";

import { useState } from "react";
import clsx from "clsx";
import { Check } from "lucide-react";
import { coverage, engines, targets } from "@/lib/services";
import { Eyebrow, Reveal } from "../ui";

export function Platforms() {
  const [hover, setHover] = useState<{ r: string; c: string } | null>(null);

  return (
    <section id="platforms" className="relative overflow-hidden bg-navy-950 py-28 text-white noise sm:py-36">
      <div className="absolute inset-0 bg-blueprint mask-radial opacity-70" aria-hidden />
      <div
        className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,192,175,0.14),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="02">Coverage matrix</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-extrabold tracking-[-0.025em] sm:text-5xl lg:text-6xl">
              Every engine.
              <br />
              <span className="text-gradient-teal">Every major cloud.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-white/65">
              Most consultancies specialise in one engine or one cloud. We cover the whole grid, so your
              architecture follows your requirements rather than our skill set.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-16">
          {/* Mobile: stacked cards */}
          <div className="grid gap-4 md:hidden">
            {engines.map((e) => (
              <div key={e.key} className="bg-white/[0.035] p-5 ring-1 ring-white/10 clip-bevel-sm">
                <h3 className="font-display text-lg font-bold">{e.short}</h3>
                <dl className="mt-4 divide-y divide-white/10">
                  {targets.map((t) => (
                    <div key={t.key} className="grid grid-cols-[5.5rem_1fr] gap-3 py-2.5 text-sm">
                      <dt className="font-mono text-xs uppercase tracking-wider text-teal">{t.short}</dt>
                      <dd className="text-white/75">{coverage[e.key][t.key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {/* Desktop: interactive matrix */}
          <div className="hidden overflow-x-auto pb-2 [scrollbar-width:thin] md:block">
            <table className="w-full min-w-[760px] table-fixed border-separate border-spacing-0 text-left">
              <caption className="sr-only">
                Database engines we support across on-premises and cloud deployment targets
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[19%] pb-5 font-mono text-[0.7rem] font-normal uppercase tracking-widest text-white/40">
                    Engine / Target
                  </th>
                  {targets.map((t) => (
                    <th
                      key={t.key}
                      scope="col"
                      className={clsx(
                        "pb-5 pl-5 font-display text-lg font-bold transition-colors",
                        hover?.c === t.key ? "text-teal" : "text-white",
                      )}
                    >
                      {t.short}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {engines.map((e) => (
                  <tr key={e.key}>
                    <th
                      scope="row"
                      className={clsx(
                        "border-t border-white/10 py-6 pr-4 font-display text-lg font-bold transition-colors",
                        hover?.r === e.key ? "text-teal" : "text-white",
                      )}
                    >
                      {e.short}
                    </th>
                    {targets.map((t) => {
                      const active = hover?.r === e.key && hover?.c === t.key;
                      const dim = hover && !active && hover.r !== e.key && hover.c !== t.key;
                      return (
                        <td
                          key={t.key}
                          onMouseEnter={() => setHover({ r: e.key, c: t.key })}
                          onMouseLeave={() => setHover(null)}
                          className="border-t border-white/10 p-1.5"
                        >
                          <div
                            className={clsx(
                              "flex h-full min-h-20 items-start gap-3 px-4 py-4 transition-all duration-300 clip-bevel-sm",
                              active ? "bg-teal text-navy" : "bg-white/[0.035] text-white/75",
                              dim && "opacity-40",
                            )}
                          >
                            <Check
                              className={clsx("mt-0.5 size-4 shrink-0", active ? "text-navy" : "text-teal")}
                              strokeWidth={3}
                              aria-hidden
                            />
                            <span className="text-sm leading-snug font-medium">{coverage[e.key][t.key]}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 font-mono text-xs text-white/40">
            Representative services shown. Data engineering and training are delivered across the same grid.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
