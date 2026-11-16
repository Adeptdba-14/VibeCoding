import clsx from "clsx";

/**
 * The AdeptTech "A" mark, traced from the supplied brand guidelines.
 * Geometry: navy A with an upward-arrow counter and a teal stem.
 */
export function Mark({
  className,
  tone = "navy",
  title,
}: {
  className?: string;
  tone?: "navy" | "white";
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 356 277"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        d="M0 277 L147 0 H209 L356 277 H266 L211 172 H268 L248 138 H222 L178 56 L134 138 H108 L88 172 H145 L90 277 Z"
        fill={tone === "white" ? "#ffffff" : "#031C50"}
      />
      <rect x="153" y="172" width="50" height="105" fill="#00C0AF" />
    </svg>
  );
}

/**
 * Horizontal lockup used in navigation and footer.
 * On light backgrounds the small "CONSULTING LTD" label uses Deep teal (per guidelines);
 * on navy it uses bright Teal.
 */
export function Logo({
  variant = "reversed",
  className,
  size = "md",
}: {
  variant?: "full" | "reversed";
  className?: string;
  size?: "md" | "lg";
}) {
  const reversed = variant === "reversed";
  return (
    <span className={clsx("inline-flex items-center gap-3", className)}>
      <Mark tone={reversed ? "white" : "navy"} className={size === "lg" ? "h-11 w-auto" : "h-8 w-auto"} />
      <span className="flex flex-col leading-none">
        <span
          className={clsx(
            "font-display font-extrabold tracking-[-0.01em]",
            size === "lg" ? "text-[1.6rem]" : "text-[1.18rem]",
            reversed ? "text-white" : "text-navy",
          )}
        >
          ADEPTTECH
        </span>
        <span
          className={clsx(
            "font-display font-medium uppercase",
            size === "lg" ? "mt-1.5 text-[0.62rem] tracking-[0.47em]" : "mt-1 text-[0.5rem] tracking-[0.42em]",
            reversed ? "text-teal" : "text-teal-deep",
          )}
        >
          Consulting Ltd
        </span>
      </span>
      <span className="sr-only">AdeptTech Consulting Ltd</span>
    </span>
  );
}
