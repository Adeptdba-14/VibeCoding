import { Hero } from "@/components/Hero";
import { Services } from "@/components/sections/Services";
import { Platforms } from "@/components/sections/Platforms";
import { Approach } from "@/components/sections/Approach";
import { Training } from "@/components/sections/Training";
import { PortfolioTeaser } from "@/components/sections/PortfolioTeaser";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.lines.join(", "),
    addressLocality: site.address.city,
    postalCode: site.address.postcode,
    addressCountry: "GB",
  },
  areaServed: "GB",
  knowsAbout: [
    "Oracle Database",
    "Microsoft SQL Server",
    "MySQL",
    "PostgreSQL",
    "Amazon Web Services",
    "Microsoft Azure",
    "Oracle Cloud Infrastructure",
    "Data Engineering",
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Services />
      <Platforms />
      <Approach />
      <Training />
      <PortfolioTeaser />
      <About />
      <Contact />
    </>
  );
}
