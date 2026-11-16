"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import clsx from "clsx";
import type { Platform } from "@/lib/services";

export function PlatformTabs({ platforms, label }: { platforms: Platform[]; label: string }) {
  const [active, setActive] = useState(platforms[0].key);
  const current = platforms.find((p) => p.key === active)!;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + platforms.length) % platforms.length;
    setActive(platforms[next].key);
    document.getElementById(`tab-${platforms[next].key}`)?.focus();
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div role="tablist" aria-label={label} className="flex gap-2 overflow-x-auto lg:col-span-4 lg:flex-col lg:overflow-visible">
        {platforms.map((p, i) => {
          const on = p.key === active;
          return (
            <button
              key={p.key}
              id={`tab-${p.key}`}
              role="tab"
              aria-selected={on}
              aria-controls={`panel-${p.key}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(p.key)}
              onKeyDown={(e) => onKey(e, i)}
              className={clsx(
                "group relative flex shrink-0 items-center justify-between gap-6 px-6 py-5 text-left transition-all duration-300 clip-bevel-sm",
                on ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-inset ring-navy/10 hover:ring-navy/30",
              )}
            >
              <span>
                <span className={clsx("block font-mono text-[0.68rem]", on ? "text-teal" : "text-teal-deep")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block font-display text-lg font-extrabold whitespace-nowrap">{p.name}</span>
              </span>
              <span
                className={clsx("hidden h-8 w-1 transition-colors lg:block", on ? "bg-teal" : "bg-navy/10")}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      <div className="relative min-h-[22rem] overflow-hidden bg-white p-8 ring-1 ring-navy/10 sm:p-10 lg:col-span-8 clip-bevel">
        <div className="absolute inset-0 bg-blueprint-light mask-radial" aria-hidden />
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            id={`panel-${current.key}`}
            role="tabpanel"
            aria-labelledby={`tab-${current.key}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="flex items-center gap-3">
              <span className="size-2.5 rounded-full" style={{ background: current.hue }} aria-hidden />
              <p className="label-caps text-teal-deep">{current.short}</p>
            </div>
            <h3 className="mt-4 font-display text-3xl font-extrabold text-navy">{current.name}</h3>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {current.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="flex gap-3 border-b border-navy/[0.07] pb-4"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-teal/15">
                    <Check className="size-3.5 text-teal-deep" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-ink">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
