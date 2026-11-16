import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/portfolio",
  "/services/database-administration",
  "/services/cloud-architecture",
  "/services/data-engineering",
  "/services/training",
];

/** Collect console errors and uncaught exceptions for the page's lifetime. */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  return errors;
}

/** Scroll through the page so scroll-triggered reveals run. */
async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 500) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

test.describe("every page renders and displays properly", () => {
  for (const route of routes) {
    test(`${route}`, async ({ page }) => {
      const errors = trackErrors(page);
      const res = await page.goto(route, { waitUntil: "networkidle" });
      expect(res?.status()).toBe(200);

      // exactly one visible h1
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();

      // header logo and footer address are on every page
      await expect(page.getByRole("link", { name: /adepttech consulting — home/i })).toBeVisible();
      await expect(page.locator("footer")).toContainText("E14 0WS");

      // brand styling actually applied (CSS loaded): navy body, Montserrat headings
      const styles = await page.evaluate(() => ({
        body: getComputedStyle(document.body).backgroundColor,
        h1Font: getComputedStyle(document.querySelector("h1")!).fontFamily,
      }));
      expect(styles.body).toBe("rgb(1, 10, 31)");
      expect(styles.h1Font.toLowerCase()).toContain("montserrat");
      expect(await page.evaluate(() => document.fonts.check('800 1em "Montserrat"'))).toBe(true);

      // content becomes visible after scrolling (no section stuck at opacity 0)
      await scrollThrough(page);
      await page.waitForTimeout(1200);
      const hiddenHeadings = await page.$$eval("main h2", (hs) =>
        hs.filter((h) => {
          let el: Element | null = h;
          while (el) {
            if (Number(getComputedStyle(el).opacity) < 0.5) return true;
            el = el.parentElement;
          }
          return false;
        }).map((h) => h.textContent),
      );
      expect(hiddenHeadings).toEqual([]);

      // no sideways scrolling
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);

      expect(errors).toEqual([]);
    });
  }
});

test("home page shows every section and the company content", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Enterprise data");
  for (const id of ["services", "platforms", "approach", "training", "portfolio", "about", "contact"]) {
    await expect(page.locator(`section#${id}`)).toHaveCount(1);
  }
  for (const text of ["Oracle", "SQL Server", "MySQL", "PostgreSQL", "AWS", "Azure", "OCI"]) {
    await expect(page.locator("main")).toContainText(text);
  }
  await expect(page.locator("#about")).toContainText("102 QuestHouse North");
  await expect(page.locator("#about")).toContainText("2 Woolmore Street");
  await expect(page.locator("#about")).toContainText("Escapade Place");
});

test("service cards and portfolio link navigate correctly", async ({ page, isMobile }) => {
  await page.goto("/");
  await page.locator('#services a[href="/services/data-engineering"]').click();
  await expect(page).toHaveURL(/\/services\/data-engineering$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("raw data to decisions");

  // switch platform tab
  await page.getByRole("tab", { name: /microsoft azure/i }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Microsoft Fabric");

  if (isMobile) {
    await page.getByRole("button", { name: /open menu/i }).click();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: /portfolio/i }).click();
  } else {
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Portfolio" }).click();
  }
  await expect(page).toHaveURL(/\/portfolio$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Proof");
});

test("contact form submits an enquiry end to end", async ({ page }) => {
  await page.goto("/#contact");
  const form = page.locator("#contact");
  await form.getByRole("button", { name: /send message/i }).click();
  await expect(form.getByText(/tell us your name/i)).toBeVisible();

  await form.getByRole("button", { name: /cloud solutions architecture/i }).click();
  await form.getByLabel(/full name/i).fill("E2E Tester");
  await form.getByLabel(/work email/i).fill("e2e@example.com");
  await form.getByLabel(/environment and goals/i).fill("Planning an Oracle to OCI migration.");
  await form.getByRole("button", { name: /send message/i }).click();
  await expect(form.getByText(/message received/i)).toBeVisible();
});

test("unknown pages show the branded 404", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByText(/zero rows/i)).toBeVisible();
  await page.getByRole("link", { name: /back to home/i }).click();
  await expect(page).toHaveURL(/\/$/);
});

for (const route of routes) {
  test(`no serious accessibility violations (WCAG 2.1 AA) on ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await scrollThrough(page);
    await page.waitForTimeout(1200);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    const serious = results.violations
      .filter((v) => v.impact === "serious" || v.impact === "critical")
      .map((v) => `${v.id}: ${v.nodes.length} node(s) — ${v.nodes[0]?.target.join(" ")}`);
    expect(serious).toEqual([]);
  });
}
