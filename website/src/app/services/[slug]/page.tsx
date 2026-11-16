import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { getService, services } from "@/lib/services";
import { PageHero } from "@/components/PageHero";
import { PlatformTabs } from "@/components/PlatformTabs";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ContactForm } from "@/components/ContactForm";
import { Button, Eyebrow, Reveal } from "@/components/ui";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.title, description: s.summary };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/#services" }, { label: service.title }]}
        index={service.index}
        eyebrow={`${service.index} · ${service.kicker}`}
        title={service.headline}
        intro={service.intro}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="#enquire">Discuss your requirements</Button>
          <Button href="#offerings" variant="ghost">
            What’s included
          </Button>
        </div>
        <div className="mt-16 flex items-center gap-4 border-t border-white/10 pt-8">
          <span className="flex size-12 items-center justify-center bg-teal text-navy clip-bevel-sm">
            <ServiceIcon icon={service.icon} className="size-5" />
          </span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-display text-sm font-bold text-white/80">
            {service.platforms.map((p) => (
              <li key={p.key}>{p.name}</li>
            ))}
          </ul>
        </div>
      </PageHero>

      {/* Platforms */}
      <section className="relative bg-mist-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Eyebrow tone="light">{service.platformsLabel}</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-[-0.025em] text-navy sm:text-5xl">
              Depth on every platform.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-14">
            <PlatformTabs platforms={service.platforms} label={service.platformsLabel} />
          </Reveal>
        </div>
      </section>

      {/* Offerings */}
      <section id="offerings" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Eyebrow tone="light">Engagement options</Eyebrow>
            <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold tracking-[-0.025em] text-navy sm:text-5xl">
              How we can help.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden bg-navy/10 ring-1 ring-navy/10 sm:grid-cols-2 lg:grid-cols-3">
            {service.offerings.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.05} className="group relative bg-white p-8 transition-colors hover:bg-mist-50">
                <span className="font-mono text-xs text-teal-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 font-display text-xl font-extrabold text-navy">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-ink">{o.body}</p>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-teal transition-all duration-700 ease-out-expo group-hover:w-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="relative overflow-hidden bg-navy py-24 text-white sm:py-28">
        <div className="absolute inset-0 bg-blueprint opacity-50" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Outcomes</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-extrabold tracking-[-0.025em] sm:text-5xl">
              What you <span className="text-teal">walk away with.</span>
            </h2>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {service.outcomes.map((o, i) => (
              <Reveal as="li" key={o} delay={i * 0.06} className="flex items-start gap-4 bg-white/[0.05] p-6 ring-1 ring-white/10 clip-bevel-sm">
                <Check className="mt-0.5 size-5 shrink-0 text-teal" strokeWidth={2.5} aria-hidden />
                <span className="font-display font-bold">{o}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-mist-50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Eyebrow tone="light">Also from AdeptTech</Eyebrow>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col bg-white p-7 ring-1 ring-navy/10 transition-colors duration-500 hover:bg-navy clip-bevel"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center bg-navy text-teal transition-colors group-hover:bg-teal group-hover:text-navy clip-bevel-sm">
                      <ServiceIcon icon={s.icon} className="size-5" />
                    </span>
                    <ArrowUpRight className="size-5 text-navy/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal" />
                  </div>
                  <h3 className="mt-8 font-display text-xl font-extrabold text-navy transition-colors group-hover:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink transition-colors group-hover:text-white/70">
                    {s.summary}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enquire */}
      <section id="enquire" className="relative overflow-hidden bg-navy-950 py-24 text-white noise sm:py-32">
        <div className="absolute inset-0 bg-blueprint mask-radial" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Enquire</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-extrabold tracking-[-0.025em] sm:text-5xl">
              Talk to a {service.slug === "training" ? "lead trainer" : "senior consultant"}.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
              Tell us about your environment and objectives. We’ll come back with practical next steps, not a
              sales script.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm defaultService={service.slug} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
