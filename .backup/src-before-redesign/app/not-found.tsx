import { Mark } from "@/components/Logo";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-dvh items-center overflow-hidden bg-navy-950 text-white noise">
      <div className="absolute inset-0 -z-10 bg-blueprint mask-radial" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 py-40 sm:px-8">
        <Mark tone="white" className="h-14 w-auto" />
        <p className="mt-10 font-mono text-sm text-teal">ERROR 404 · ROW NOT FOUND</p>
        <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight sm:text-7xl">
          This query returned
          <br />
          zero rows.
        </h1>
        <p className="mt-6 max-w-lg font-mono text-sm leading-relaxed text-white/55">
          SELECT * FROM pages WHERE url = &apos;this one&apos;;
          <br />
          <span className="text-white/35">-- 0 rows selected (0.002s)</span>
        </p>
        <div className="mt-10">
          <Button href="/">Back to home</Button>
        </div>
      </div>
    </section>
  );
}
