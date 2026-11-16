import { Clock, Mail, MapPin, ShieldCheck } from "lucide-react";
import { addressOneLine, site } from "@/lib/site";
import { ContactForm } from "../ContactForm";
import { Eyebrow, Reveal } from "../ui";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-navy-950 py-28 text-white noise sm:py-36">
      <div className="absolute inset-0 bg-blueprint mask-radial" aria-hidden />
      <div
        className="absolute -top-40 left-1/4 h-[36rem] w-[60rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,192,175,0.16),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow index="07">Contact</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-6xl">
              Let’s talk about your <span className="text-gradient-teal">data estate.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
              Whether it’s an urgent performance issue, a cloud migration or a training programme for your team,
              tell us where you are and we’ll show you a clear way forward.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-12 space-y-6">
              <Info icon={MapPin} label="Office">
                {addressOneLine}
              </Info>
              {site.email && (
                <Info icon={Mail} label="Email">
                  <a href={`mailto:${site.email}`} className="hover:text-teal">
                    {site.email}
                  </a>
                </Info>
              )}
              <Info icon={Clock} label="Response">
                We aim to reply to every enquiry within one business day.
              </Info>
              <Info icon={ShieldCheck} label="Confidential">
                Happy to sign an NDA before discussing your environment.
              </Info>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

function Info({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center bg-white/[0.06] ring-1 ring-white/10 clip-bevel-sm">
        <Icon className="size-4 text-teal" />
      </span>
      <div>
        <p className="label-caps text-white/45">{label}</p>
        <p className="mt-2 leading-relaxed text-white/85">{children}</p>
      </div>
    </li>
  );
}
