import { Eyebrow, Reveal } from "../ui";

const steps = [
  {
    n: "01",
    title: "Assess",
    body: "We baseline your estate: workloads, risks, licensing, skills and cost. Evidence first, opinions second.",
  },
  {
    n: "02",
    title: "Architect",
    body: "A target design and roadmap that balances performance, resilience, compliance and spend.",
  },
  {
    n: "03",
    title: "Build & migrate",
    body: "Infrastructure as code, rehearsed cutovers and rollback plans. No heroics on go-live night.",
  },
  {
    n: "04",
    title: "Operate",
    body: "Proactive DBA and platform support, with monitoring, patching, tuning and tested recovery.",
  },
  {
    n: "05",
    title: "Enable",
    body: "Training, runbooks and mentoring, so your team owns the platform with confidence.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="relative bg-white py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow tone="light" index="03">
              How we work
            </Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] font-extrabold tracking-[-0.025em] text-navy sm:text-5xl">
              A delivery model built to leave you stronger.
            </h2>
          </Reveal>
        </div>

        <ol className="relative mt-20 grid gap-px overflow-hidden bg-navy/10 ring-1 ring-navy/10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.07} className="group relative bg-white p-8 transition-colors duration-500 hover:bg-mist-50">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-teal-deep">{s.n}</span>
                {/* arrow motif from the A mark */}
                <svg viewBox="0 0 40 40" className="size-6 text-navy/15 transition-colors group-hover:text-teal" aria-hidden>
                  <path d="M20 4 L34 26 H24 V36 H16 V26 H6 Z" fill="currentColor" />
                </svg>
              </div>
              <h3 className="mt-14 font-display text-2xl font-extrabold text-navy">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink">{s.body}</p>
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-teal transition-all duration-700 ease-out-expo group-hover:w-full" />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
