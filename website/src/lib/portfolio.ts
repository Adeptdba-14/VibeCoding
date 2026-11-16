import type { ServiceSlug } from "./services";

/**
 * Portfolio / case studies.
 * Add entries here when they are ready to publish. While the list is empty,
 * the /portfolio page shows a "coming soon" state automatically.
 */
export type CaseStudy = {
  slug: string;
  title: string;
  client: string; // can be anonymised, e.g. "Tier-1 UK retailer"
  sector: string;
  services: ServiceSlug[];
  platforms: string[];
  summary: string;
  results: { value: string; label: string }[];
  href?: string; // optional link to a full write-up
};

export const caseStudies: CaseStudy[] = [];
