import { describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const req = (body: unknown, raw = false) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw ? (body as string) : JSON.stringify(body),
  });

describe("POST /api/contact", () => {
  it("accepts a valid enquiry", async () => {
    const log = vi.spyOn(console, "info").mockImplementation(() => {});
    const res = await POST(
      req({ name: "Ada", email: "ada@example.com", message: "Oracle RAC tuning help", services: ["training", 4] }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    const logged = log.mock.calls[0][1] as { services: string[] };
    expect(logged.services).toEqual(["training"]); // non-strings are dropped
    log.mockRestore();
  });

  it("rejects malformed JSON with 400", async () => {
    const res = await POST(req("{not json", true));
    expect(res.status).toBe(400);
  });

  it.each([
    [{ name: "", email: "a@b.co", message: "long enough message" }],
    [{ name: "Ada", email: "not-an-email", message: "long enough message" }],
    [{ name: "Ada", email: "a@b.co", message: "short" }],
  ])("rejects invalid fields with 422 (%#)", async (body) => {
    const res = await POST(req(body));
    expect(res.status).toBe(422);
  });
});
