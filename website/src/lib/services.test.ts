import { describe, expect, it } from "vitest";
import { clouds, coverage, engines, getService, services, targets } from "./services";
import { addressOneLine, mapsUrl, nav, site } from "./site";
import { caseStudies } from "./portfolio";

describe("services data", () => {
  it("offers exactly the four requested service lines", () => {
    expect(services.map((s) => s.slug)).toEqual([
      "database-administration",
      "cloud-architecture",
      "data-engineering",
      "training",
    ]);
  });

  it("has unique slugs and sequential indexes", () => {
    expect(new Set(services.map((s) => s.slug)).size).toBe(services.length);
    expect(services.map((s) => s.index)).toEqual(["01", "02", "03", "04"]);
  });

  it("covers all four RDBMS engines in DBA services", () => {
    const dba = getService("database-administration")!;
    expect(dba.platforms.map((p) => p.short)).toEqual(["Oracle", "SQL Server", "MySQL", "PostgreSQL"]);
  });

  it.each(["cloud-architecture", "data-engineering"])("%s covers AWS, Azure and OCI", (slug) => {
    expect(getService(slug)!.platforms.map((p) => p.short)).toEqual(["AWS", "Azure", "OCI"]);
  });

  it("gives every service complete content", () => {
    for (const s of services) {
      expect(s.title).toBeTruthy();
      expect(s.summary.length).toBeGreaterThan(40);
      expect(s.offerings.length).toBeGreaterThanOrEqual(3);
      expect(s.outcomes.length).toBeGreaterThanOrEqual(3);
      for (const p of s.platforms) expect(p.items.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("returns undefined for unknown slugs", () => {
    expect(getService("nope")).toBeUndefined();
  });

  it("fills every cell of the coverage matrix", () => {
    expect(engines).toHaveLength(4);
    expect(clouds).toHaveLength(3);
    for (const e of engines) for (const t of targets) expect(coverage[e.key][t.key]).toBeTruthy();
  });
});

describe("site details", () => {
  it("contains the company address", () => {
    expect(addressOneLine).toBe("102 QuestHouse North, 2 Woolmore Street, Escapade Place, London, E14 0WS");
    expect(mapsUrl).toContain(encodeURIComponent("E14 0WS"));
    expect(site.legalName).toBe("ADEPTTECH CONSULTING LTD");
  });

  it("links to the portfolio from the main navigation", () => {
    expect(nav.some((n) => n.href === "/portfolio")).toBe(true);
  });

  it("portfolio is an array (empty until case studies are published)", () => {
    expect(Array.isArray(caseStudies)).toBe(true);
  });
});
