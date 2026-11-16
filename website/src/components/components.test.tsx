import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlatformTabs } from "./PlatformTabs";
import { Nav } from "./Nav";
import { Logo, Mark } from "./Logo";
import { getService, services } from "@/lib/services";
import { Services } from "./sections/Services";
import { Platforms } from "./sections/Platforms";

describe("PlatformTabs", () => {
  const dba = getService("database-administration")!;

  it("shows the first platform and switches on click", async () => {
    const user = userEvent.setup();
    render(<PlatformTabs platforms={dba.platforms} label="Engines" />);
    expect(screen.getByRole("tab", { name: /oracle database/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent(/RMAN/);

    await user.click(screen.getByRole("tab", { name: /postgresql/i }));
    expect(await screen.findByText(/Patroni high-availability/)).toBeInTheDocument();
  });

  it("supports arrow-key navigation", async () => {
    const user = userEvent.setup();
    render(<PlatformTabs platforms={dba.platforms} label="Engines" />);
    screen.getByRole("tab", { name: /oracle database/i }).focus();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("tab", { name: /postgresql/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: /postgresql/i })).toHaveFocus();
  });
});

describe("Nav", () => {
  it("renders primary links and toggles the mobile menu", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const primary = screen.getByRole("navigation", { name: "Primary" });
    for (const label of ["Services", "Platforms", "Training", "Portfolio", "About"]) {
      expect(within(primary).getByRole("link", { name: label })).toBeInTheDocument();
    }
    const toggle = screen.getByRole("button", { name: /open menu/i });
    await user.click(toggle);
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Brand", () => {
  it("renders the logo with an accessible name and brand colours", () => {
    const { container } = render(
      <>
        <Logo variant="full" />
        <Mark title="AdeptTech" />
      </>,
    );
    expect(screen.getByText("AdeptTech Consulting Ltd")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "AdeptTech" })).toBeInTheDocument();
    const fills = [...container.querySelectorAll("path, rect")].map((el) => el.getAttribute("fill"));
    expect(fills).toContain("#031C50");
    expect(fills).toContain("#00C0AF");
  });
});

describe("Home sections", () => {
  it("links each service card to its page", () => {
    render(<Services />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(services.map((s) => `/services/${s.slug}`));
    for (const s of services) {
      expect(screen.getByRole("heading", { name: s.title })).toBeInTheDocument();
    }
  });

  it("renders the full engine × target coverage table", () => {
    render(<Platforms />);
    const table = screen.getByRole("table");
    expect(within(table).getAllByRole("row")).toHaveLength(5); // header + 4 engines
    expect(within(table).getByText("MySQL HeatWave")).toBeInTheDocument();
  });
});
