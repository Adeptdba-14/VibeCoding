import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 * Currently validates and logs enquiries to the server console.
 * To deliver real email, plug in a provider here (e.g. Resend, SendGrid, Microsoft Graph).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const str = (v: unknown, max = 5000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const enquiry = {
    name: str(body.name, 200),
    email: str(body.email, 200),
    company: str(body.company, 200),
    phone: str(body.phone, 50),
    message: str(body.message),
    services: Array.isArray(body.services) ? body.services.filter((s) => typeof s === "string").slice(0, 10) : [],
    receivedAt: new Date().toISOString(),
  };

  if (!enquiry.name || !/^\S+@\S+\.\S+$/.test(enquiry.email) || enquiry.message.length < 10) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 422 });
  }

  console.info("[contact] New enquiry", enquiry);
  return NextResponse.json({ ok: true });
}
