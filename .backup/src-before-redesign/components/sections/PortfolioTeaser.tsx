import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/portfolio";
import { Button, Eyebrow, Reveal } from "../ui";
import { CaseStudyCard, PlaceholderCard } from "../CaseStudyCards";

const placeholders = [
  { tag: "Database Administration", title: "High-availability platform modernisation" },
  { tag: "Cloud Architecture", title: "Database migration to the cloud" },
  { tag: "Data Engineering", title: "Real-time analytics pipeline" },
];

export function PortfolioTeaser() {
  const hasWork = caseStudies.length > 0;
  return (
    <section id="portfolio" className="relative bg-mist-50 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <Eyebrow tone="light" index="05">
              Portfolio
            </Eyebrow>
            <h2 className="mt-6 max-w-2xl font-display text-4xl leading-[1.05] font-extrabold tracking-[-0.025em] text-navy sm:text-5xl">
              Proof, not promises.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 font-display font-bold text-teal-deep hover:text-navy"
            >
              View full portfolio
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {hasWork
            ? caseStudies.slice(0, 3).map((c, i) => (
                <Reveal key={c.slug} delay={i * 0.08}>
                  <CaseStudyCard study={c} />
                </Reveal>
              ))
            : placeholders.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <PlaceholderCard tag={p.tag} title={p.title} index={i} />
                </Reveal>
              ))}
        </div>

        {!hasWork && (
          <Reveal delay={0.2} className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-navy/10 pt-10 sm:flex-row sm:items-center">
            <p className="max-w-xl text-ink">
              Detailed case studies are being prepared for publication. Contact us for references and examples
              relevant to your project.
            </p>
            <Button href="#contact" variant="navy">
              Request references
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
