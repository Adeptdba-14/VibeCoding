/** Instant placeholder shown while a service page streams in (gives the route its Suspense boundary). */
export default function Loading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading service"
      className="relative isolate min-h-[70vh] overflow-hidden bg-navy-950 pt-36 pb-24 sm:pt-44"
    >
      <div className="absolute inset-0 -z-10 bg-blueprint mask-radial" aria-hidden />
      <div className="mx-auto max-w-7xl animate-pulse px-5 sm:px-8" aria-hidden>
        <div className="h-3 w-48 bg-white/10" />
        <div className="mt-12 h-3 w-40 bg-teal/40" />
        <div className="mt-8 h-14 w-full max-w-3xl bg-white/10" />
        <div className="mt-4 h-14 w-2/3 max-w-2xl bg-white/10" />
        <div className="mt-10 h-4 w-full max-w-xl bg-white/[0.06]" />
        <div className="mt-3 h-4 w-5/6 max-w-lg bg-white/[0.06]" />
      </div>
    </section>
  );
}
