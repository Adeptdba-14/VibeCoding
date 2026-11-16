"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import clsx from "clsx";
import { services } from "@/lib/services";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string[]>(defaultService ? [defaultService] : []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const payload = { ...data, services: selected };

    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) errs.email = "Please enter a valid email address.";
    if ((data.message ?? "").trim().length < 10) errs.message = "A few more details would help (10+ characters).";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
      setSelected([]);
    } catch {
      setStatus("error");
    }
  }

  const toggle = (slug: string) =>
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));

  return (
    <div className="relative bg-white p-7 text-navy shadow-2xl shadow-black/40 clip-bevel sm:p-10">
      <span className="absolute top-0 left-0 h-1 w-full bg-teal" />
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[28rem] flex-col items-start justify-center"
            role="status"
          >
            <CheckCircle2 className="size-12 text-teal" strokeWidth={1.5} />
            <h3 className="mt-6 font-display text-3xl font-extrabold">Message received.</h3>
            <p className="mt-3 max-w-md text-ink">
              Thank you for getting in touch. A consultant will be in touch shortly, usually within one business day.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 font-display text-sm font-bold text-teal-deep hover:text-navy"
            >
              Send another message →
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate initial={false} exit={{ opacity: 0 }}>
            <fieldset>
              <legend className="font-display text-sm font-bold text-navy">What can we help with?</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {services.map((s) => {
                  const on = selected.includes(s.slug);
                  return (
                    <button
                      key={s.slug}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(s.slug)}
                      className={clsx(
                        "rounded-full px-4 py-2 text-sm font-medium ring-1 transition-all",
                        on ? "bg-navy text-white ring-navy" : "bg-white text-ink ring-navy/15 hover:ring-navy/40",
                      )}
                    >
                      {s.title}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field name="name" label="Full name" autoComplete="name" error={errors.name} required />
              <Field name="email" label="Work email" type="email" autoComplete="email" error={errors.email} required />
              <Field name="company" label="Company" autoComplete="organization" />
              <Field name="phone" label="Phone (optional)" type="tel" autoComplete="tel" />
            </div>
            <div className="mt-5">
              <Field name="message" label="Tell us about your environment and goals" textarea error={errors.message} required />
            </div>

            <div className="mt-8 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-ink/70">
                We’ll only use your details to respond to this enquiry.
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-2.5 bg-navy px-7 py-4 font-display text-[0.95rem] font-bold text-white transition hover:bg-navy-700 disabled:opacity-70 clip-bevel-sm"
              >
                {status === "sending" ? (
                  <>
                    Sending <Loader2 className="size-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send message <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
            {status === "error" && (
              <p className="mt-4 text-sm font-medium text-red-700" role="alert">
                Something went wrong sending your message. Please try again.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  textarea,
  error,
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = `f-${name}`;
  const cls = clsx(
    "peer mt-2 block w-full bg-mist-50 px-4 py-3.5 text-navy ring-1 ring-inset outline-none transition placeholder:text-ink/40 focus:bg-white focus:ring-2 focus:ring-teal-deep",
    error ? "ring-red-500" : "ring-navy/10",
  );
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-navy">
        {label}
        {required && <span className="text-teal-deep"> *</span>}
      </label>
      {textarea ? (
        <textarea id={id} name={name} rows={5} className={clsx(cls, "resize-y")} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} />
      ) : (
        <input id={id} name={name} type={type} autoComplete={autoComplete} className={cls} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} />
      )}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
