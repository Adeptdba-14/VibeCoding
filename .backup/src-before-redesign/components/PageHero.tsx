import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Mark } from "./Logo";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
  index,
}: {
  index?: string;
  crumbs: { label: string; href?: string }[];
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pt-36 pb-24 text-white noise sm:pt-44 sm:pb-28">
      <div className="absolute inset-0 -z-10 bg-blueprint mask-radial" aria-hidden />
      <div
        className="absolute -top-40 right-0 -z-10 h-[40rem] w-[60rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,192,175,0.16),transparent)]"
        aria-hidden
      />
      <Mark tone="white" className="absolute -right-32 -bottom-24 -z-10 h-[30rem] w-auto opacity-[0.03]" />
      {index && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-40 right-[max(1.25rem,calc((100vw-80rem)/2+2rem))] -z-10 hidden font-display text-[19rem] leading-none font-extrabold tracking-[-0.06em] text-transparent select-none lg:block"
          style={{ WebkitTextStroke: "1.5px rgba(0,192,175,0.35)" }}
        >
          {index}
        </span>
      )}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-white/45">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3" aria-hidden />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-teal">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white/75">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="mt-10 flex items-center gap-3 label-caps text-teal">
          <span className="h-px w-8 bg-teal/60" />
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
