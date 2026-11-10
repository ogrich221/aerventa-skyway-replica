import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="AERVANTA home">
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <circle cx="20" cy="20" r="17" fill="none" className="stroke-gold" strokeWidth="1.2" opacity="0.55" />
        <ellipse cx="20" cy="20" rx="17" ry="7" fill="none" className="stroke-gold" strokeWidth="1" opacity="0.4" />
        <path d="M5 27 C 14 23, 22 15, 35 9 L 29 17 C 22 19, 14 24, 5 27 Z" className="fill-gold" />
        <circle cx="35" cy="9" r="1.6" className="fill-gold" />
      </svg>
      <span className={`font-display text-2xl font-semibold tracking-[0.22em] ${light ? "text-navy-foreground" : "text-navy"}`}>
        AERVANTA
      </span>
    </Link>
  );
}
