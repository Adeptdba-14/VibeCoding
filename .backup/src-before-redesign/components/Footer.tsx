import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Logo, Mark } from "./Logo";
import { services } from "@/lib/services";
import { mapsUrl, site } from "@/lib/site";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white/70 noise">
      <div className="pointer-events-none absolute inset-0 bg-blueprint mask-fade-b opacity-60" />
      <Mark
        tone="white"
        className="pointer-events-none absolute -right-24 -bottom-16 h-[26rem] w-auto opacity-[0.035]"
      />

      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="reversed" size="lg" />
            <p className="mt-6 max-w-sm leading-relaxed">
              Expert database administration, cloud solutions architecture, data engineering and training,
              delivered from London.
            </p>
            <address className="mt-8 flex gap-3 not-italic">
              <MapPin className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
              <span className="leading-relaxed">
                {site.address.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <span className="block">
                  {site.address.city} {site.address.postcode}
                </span>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal hover:text-teal-300"
                >
                  Open in Maps <ArrowUpRight className="size-3.5" />
                </a>
              </span>
            </address>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <FooterCol title="Services">
              {services.map((s) => (
                <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                  {s.title}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Company">
              <FooterLink href="/#about">About</FooterLink>
              <FooterLink href="/#approach">Approach</FooterLink>
              <FooterLink href="/portfolio">Portfolio</FooterLink>
              <FooterLink href="/#contact">Contact</FooterLink>
            </FooterCol>
            <FooterCol title="Platforms">
              {["Oracle", "SQL Server", "MySQL", "PostgreSQL", "AWS", "Azure", "OCI"].map((p) => (
                <li key={p} className="text-white/55">
                  {p}
                </li>
              ))}
            </FooterCol>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-xs tracking-wide">
            <span className="text-teal">●</span> All systems nominal
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="label-caps text-teal">{title}</h2>
      <ul className="mt-6 space-y-3 text-[0.95rem]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
