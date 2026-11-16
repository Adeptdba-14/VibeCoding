"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-expo",
        scrolled || open
          ? "border-b border-white/10 bg-navy-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="AdeptTech Consulting — home" className="rounded-md py-2">
          <Logo variant="reversed" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = item.href === pathname;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "group relative rounded-md px-4 py-2 text-[0.92rem] font-medium transition-colors",
                  active ? "text-white" : "text-white/70 hover:text-white",
                )}
              >
                {item.label}
                <span
                  className={clsx(
                    "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-teal transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="group hidden items-center gap-2 bg-teal px-5 py-2.5 font-display text-sm font-bold text-navy transition hover:bg-teal-300 sm:inline-flex clip-bevel-sm"
          >
            Start a conversation
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-md text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-navy-950 lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pt-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-white/10 py-5 font-display text-3xl font-extrabold text-white"
                  >
                    <span className="font-mono text-xs font-normal text-teal">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="px-5 pt-8">
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-teal px-6 py-4 font-display font-bold text-navy clip-bevel-sm"
              >
                Start a conversation <ArrowUpRight className="size-5" />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
