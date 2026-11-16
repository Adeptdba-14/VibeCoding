const items = [
  "Oracle",
  "Microsoft SQL Server",
  "MySQL",
  "PostgreSQL",
  "Amazon Web Services",
  "Microsoft Azure",
  "Oracle Cloud Infrastructure",
  "Data Engineering",
  "Training",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative border-y border-white/10 bg-navy-900 py-6 text-white" aria-label="Technologies we work with">
      <div className="overflow-hidden mask-fade-x">
        <ul className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
          {row.map((item, i) => (
            <li
              key={i}
              aria-hidden={i >= items.length}
              className="flex items-center whitespace-nowrap font-display text-xl font-bold tracking-tight text-white/80 sm:text-2xl"
            >
              <span className="px-8">{item}</span>
              <MarkGlyph />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MarkGlyph() {
  return (
    <svg viewBox="0 0 356 277" className="h-3.5 w-auto" aria-hidden>
      <path
        d="M0 277 L147 0 H209 L356 277 H266 L211 172 H268 L248 138 H222 L178 56 L134 138 H108 L88 172 H145 L90 277 Z"
        fill="currentColor"
        className="text-white/25"
      />
      <rect x="153" y="172" width="50" height="105" fill="#00C0AF" />
    </svg>
  );
}
