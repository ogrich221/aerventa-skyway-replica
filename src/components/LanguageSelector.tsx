import { Globe } from "lucide-react";
import { LANGUAGES, useLanguage } from "@/lib/language";

export function LanguageSelector({ light }: { light?: boolean }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-flex items-center gap-1.5" title="Select Destination Language">
      <Globe className={`h-3.5 w-3.5 shrink-0 ${light ? "text-gold" : "text-gold"}`} aria-hidden />
      <label htmlFor="top-left-lang-select" className="sr-only">
        Language selection for all destinations
      </label>
      <select
        id="top-left-lang-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className={`cursor-pointer appearance-none rounded border py-1 pl-2 pr-6 text-xs font-medium transition focus:outline-none focus:ring-1 focus:ring-gold ${
          light
            ? "border-white/20 bg-navy/60 text-navy-foreground hover:border-gold/60 focus:bg-navy"
            : "border-border bg-background text-navy hover:border-navy/40"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4af37'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.35rem center",
          backgroundSize: "0.75rem",
        }}
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code} className="bg-background text-navy">
            {l.flag} {l.native} — {l.name} ({l.region})
          </option>
        ))}
      </select>
    </div>
  );
}
