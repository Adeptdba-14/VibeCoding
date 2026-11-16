"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

/** Fade/slide-in on scroll. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
  index,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  index?: string;
}) {
  return (
    <p className={clsx("flex items-center gap-3 label-caps", tone === "dark" ? "text-teal" : "text-teal-deep")}>
      {index && <span className="font-mono tracking-normal">{index}</span>}
      <span className={clsx("h-px w-8", tone === "dark" ? "bg-teal/60" : "bg-teal-deep/60")} />
      {children}
    </p>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "navy";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "group inline-flex items-center justify-center gap-2.5 px-7 py-4 font-display text-[0.95rem] font-bold transition-all duration-300 clip-bevel-sm",
        variant === "primary" && "bg-teal text-navy hover:bg-teal-300",
        variant === "navy" && "bg-navy text-white hover:bg-navy-700",
        variant === "ghost" &&
          "bg-white/[0.04] text-white ring-1 ring-inset ring-white/20 hover:bg-white/10 hover:ring-white/40",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
