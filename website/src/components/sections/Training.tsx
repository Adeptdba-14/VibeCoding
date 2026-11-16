import Link from "next/link";
import { ArrowUpRight, BookOpen, Presentation, Users, Wrench } from "lucide-react";
import { getService } from "@/lib/services";
import { Button, Eyebrow, Reveal } from "../ui";

const formats = [
  { icon: Presentation, label: "Instructor-led", note: "On-site in London or remote" },
  { icon: Wrench, label: "Hands-on labs", note: "Real environments, real failures" },
  { icon: Users, label: "Bespoke programmes", note: "Built around your estate" },
  { icon: BookOpen, label: "Certification prep", note: "Oracle · Microsoft · AWS · OCI" },
];

export function Training() {
  const training = getService("training")!;
  return (
    <section id="training" className="relative overflow-hidden bg-navy py-28 text-white sm:py-36">
      <div className="absolute inset-0 bg-blueprint opacity-50 mask-fade-b" aria-hidden />
      {/* big slanted teal slab echoing the mark */}
      <div
        className="absolute -right-[20%] top-0 hidden h-full w-[55%] bg-teal/[0.07] lg:block"
        style={{ clipPath: "polygon(28% 0, 100% 0, 100% 100%, 0 100%)" }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow index="04">Training & enablement</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-extrabold tracking-[-0.025em] sm:text-5xl">
              Expertise that stays <span className="text-teal">when we leave.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Every service we deliver, we also teach. Our courses are run by the consultants who do the work,
              drawing on real production incidents, migrations and tuning engagements.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-10 grid grid-cols-2 gap-3">
              {formats.map(({ icon: Icon, label, note }) => (
                <li key={label} className="bg-white/[0.04] p-4 ring-1 ring-white/10 clip-bevel-sm">
                  <Icon className="size-5 text-teal" strokeWidth={1.75} aria-hidden />
                  <p className="mt-3 font-display text-sm font-bold">{label}</p>
                  <p className="mt-1 text-xs leading-snug text-white/55">{note}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/services/training">View training tracks</Button>
            </div>
          </Reveal>
        </div>

        <div className="space-y-4 lg:col-span-7 lg:pl-8">
          {training.platforms.map((track, i) => (
            <Reveal key={track.key} delay={0.1 + i * 0.08}>
              <Link
                href="/services/training"
                className="group block bg-navy-950/60 p-7 ring-1 ring-white/10 backdrop-blur transition-all duration-500 hover:ring-teal/60 sm:p-8 clip-bevel"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-teal">T/{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-xl font-extrabold sm:text-2xl">{track.name}</h3>
                  </div>
                  <ArrowUpRight className="size-5 shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal" />
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {track.items.slice(0, 5).map((m) => (
                    <li key={m} className="rounded-sm bg-white/[0.06] px-2.5 py-1 text-xs text-white/70">
                      {m}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
