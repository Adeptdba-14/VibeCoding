import type { Metadata } from "next";
import { caseStudies } from "@/lib/portfolio";
import { PageHero } from "@/components/PageHero";
import { CaseStudyCard, PlaceholderCard } from "@/components/CaseStudyCards";
import { Button, Eyebrow, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Case studies and selected work from AdeptTech Consulting.",
};

const placeholders = [
  { tag: "Database Administration", title: "High-availability platform modernisation" },
  { tag: "Cloud Architecture", title: "Database migration to the cloud" },
  { tag: "Data Engineering", title: "Real-time analytics pipeline" },
  { tag: "Database Administration", title: "Cross-engine migration to PostgreSQL" },
  { tag: "Cloud Architecture", title: "Multi-cloud landing zone" },
  { tag: "Training", title: "Corporate DBA upskilling programme" },
];

export default function PortfolioPage() {
  const hasWork = caseStudies.length > 0;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
        eyebrow="Selected work"
        title={
          <>
            Proof, <span className="text-gradient-teal">not promises.</span>
          </>
        }
        intro={
          hasWork
            ? "A selection of engagements across database administration, cloud architecture, data engineering and training."
            : "We’re preparing detailed case studies for publication. In the meantime, we’re happy to share references and examples relevant to your project."
        }
      />

      <section className="bg-mist-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {hasWork
              ? caseStudies.map((c, i) => (
                  <Reveal key={c.slug} delay={(i % 3) * 0.08}>
                    <CaseStudyCard study={c} />
                  </Reveal>
                ))
              : placeholders.map((p, i) => (
                  <Reveal key={p.title} delay={(i % 3) * 0.08}>
                    <PlaceholderCard tag={p.tag} title={p.title} index={i} />
                  </Reveal>
                ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <Reveal className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center">
          <div>
            <Eyebrow tone="light">References available</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-3xl leading-tight font-extrabold text-navy sm:text-4xl">
              Want to see relevant work before we talk scope?
            </h2>
          </div>
          <Button href="/#contact" variant="navy">
            Request references
          </Button>
        </Reveal>
      </section>
    </>
  );
}
