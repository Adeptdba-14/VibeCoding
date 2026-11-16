/**
 * Company details used across the site.
 * Fill in `email` and `phone` when ready — anything left empty is hidden automatically.
 */
export const site = {
  name: "AdeptTech Consulting Ltd",
  legalName: "ADEPTTECH CONSULTING LTD",
  shortName: "AdeptTech",
  url: "http://localhost:3000",
  tagline: "Enterprise data. Engineered without compromise.",
  description:
    "London-based consultancy delivering expert DBA services for Oracle, SQL Server, MySQL and PostgreSQL, cloud solutions architecture on AWS, Azure and OCI, data engineering, and hands-on training.",
  email: "",
  phone: "",
  linkedin: "",
  address: {
    lines: ["102 QuestHouse North", "2 Woolmore Street", "Escapade Place"],
    city: "London",
    postcode: "E14 0WS",
    country: "United Kingdom",
  },
} as const;

export const addressOneLine = [
  ...site.address.lines,
  site.address.city,
  site.address.postcode,
].join(", ");

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.address.lines.slice(1).join(", ")}, ${site.address.city} ${site.address.postcode}`,
)}`;

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Platforms", href: "/#platforms" },
  { label: "Training", href: "/services/training" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/#about" },
] as const;
