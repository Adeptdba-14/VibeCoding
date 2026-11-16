import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import type { CaseStudy } from "@/lib/portfolio";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const body = (
    <>
      <span className="absolute top-0 left-0 h-1 w-16 bg-teal transition-all duration-700 group-hover:w-full" />
      <p className="label-caps text-teal-deep">{study.sector}</p>
      <h3 className="mt-4 font-display text-2xl font-extrabold text-navy">{study.title}</h3>
      <p className="mt-1 text-sm text-ink/70">{study.client}</p>
      <p className="mt-5 leading-relaxed text-ink">{study.summary}</p>
      {study.results.length > 0 && (
        <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-navy/10 pt-6">
          {study.results.slice(0, 2).map((r) => (
            <div key={r.label}>
              <dt className="sr-only">{r.label}</dt>
              <dd className="font-display text-3xl font-extrabold text-navy">{r.value}</dd>
              <dd className="text-xs text-ink/70">{r.label}</dd>
            </div>
          ))}
        </dl>
      )}
      <ul className="mt-6 flex flex-wrap gap-2">
        {study.platforms.map((p) => (
          <li key={p} className="rounded-full border border-navy/15 px-3 py-1 text-xs font-medium text-navy/80">
            {p}
          </li>
        ))}
      </ul>
      {study.href && (
        <span className="mt-6 inline-flex items-center gap-1 font-display text-sm font-bold text-teal-deep">
          Read case study <ArrowUpRight className="size-4" />
        </span>
      )}
    </>
  );
  const cls = "group relative block h-full overflow-hidden bg-white p-8 ring-1 ring-navy/10 clip-bevel";
  return study.href ? (
    <Link href={study.href} className={cls}>
      {body}
    </Link>
  ) : (
    <article className={cls}>{body}</article>
  );
}

export function PlaceholderCard({ tag, title, index }: { tag: string; title: string; index: number }) {
  return (
    <article className="group relative flex h-full min-h-80 flex-col overflow-hidden bg-navy p-8 text-white clip-bevel">
      <div className="absolute inset-0 bg-blueprint opacity-60" aria-hidden />
      {/* redaction bars */}
      <div className="relative space-y-2.5" aria-hidden>
        <div className="h-2.5 w-3/4 bg-white/10" />
        <div className="h-2.5 w-1/2 bg-white/10" />
        <div className="h-2.5 w-2/3 bg-teal/30" />
      </div>
      <div className="relative mt-auto">
        <p className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-widest text-teal">
          <Lock className="size-3.5" aria-hidden /> Case study {String(index + 1).padStart(2, "0")} · In preparation
        </p>
        <p className="mt-4 label-caps text-white/50">{tag}</p>
        <h3 className="mt-3 font-display text-xl font-extrabold leading-snug">{title}</h3>
      </div>
    </article>
  );
}
