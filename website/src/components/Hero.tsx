"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Mark } from "./Logo";
import { OpsConsole } from "./OpsConsole";
import { Button } from "./ui";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const markY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const consoleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease },
  });

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-navy-950 pt-32 pb-20 noise sm:pt-40 lg:pb-24">
      {/* Atmosphere */}
      <div className="absolute inset-0 -z-10 bg-blueprint mask-radial" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[46rem] w-[80rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,192,175,0.20),transparent)]"
        aria-hidden
      />
      <div
        className="absolute -bottom-60 -left-40 -z-10 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(22,58,133,0.55),transparent)]"
        aria-hidden
      />
      <motion.div style={{ y: markY }} className="absolute -right-40 top-10 -z-10 hidden lg:block" aria-hidden>
        <Mark tone="white" className="h-[44rem] w-auto opacity-[0.025]" />
      </motion.div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.div {...fade(0.05)} className="inline-flex items-center gap-3 rounded-full bg-white/[0.05] py-1.5 pr-4 pl-1.5 ring-1 ring-white/10">
            <span className="rounded-full bg-teal px-2.5 py-0.5 font-display text-[0.65rem] font-bold uppercase tracking-wider text-navy">
              London
            </span>
            <span className="text-sm text-white/70">DBA · Cloud architecture · Data engineering · Training</span>
          </motion.div>

          <motion.h1
            {...fade(0.15)}
            className="mt-8 font-display text-[2.7rem] leading-[1.02] font-extrabold tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.6rem]"
          >
            Enterprise data,
            <br />
            <span className="text-gradient-teal">engineered</span> without
            <br className="hidden sm:block" /> compromise.
          </motion.h1>

          <motion.p {...fade(0.3)} className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
            AdeptTech Consulting runs, re-architects and modernises the databases and data platforms your business
            depends on. We work across{" "}
            <strong className="font-semibold text-white">Oracle, SQL Server, MySQL and PostgreSQL</strong> on{" "}
            <strong className="font-semibold text-white">AWS, Azure and OCI</strong>, and we train your team to
            run them.
          </motion.p>

          <motion.div {...fade(0.45)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#services">Explore services</Button>
            <Button href="#contact" variant="ghost">
              Talk to an expert
            </Button>
          </motion.div>

          <motion.dl
            {...fade(0.6)}
            className="mt-14 grid max-w-lg grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-8"
          >
            {[
              ["4", "RDBMS engines"],
              ["3", "Hyperscalers"],
              ["1", "Accountable team"],
            ].map(([n, l]) => (
              <div key={l} className="px-5 first:pl-0">
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-4xl font-extrabold text-white">
                  {n}
                  <span className="text-teal">.</span>
                </dd>
                <dd className="mt-1 text-sm text-white/55">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          style={{ y: consoleY }}
          initial={reduce ? false : { opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.35, ease }}
          className="lg:col-span-5 [perspective:1200px]"
        >
          <OpsConsole />
        </motion.div>
      </div>
    </section>
  );
}
