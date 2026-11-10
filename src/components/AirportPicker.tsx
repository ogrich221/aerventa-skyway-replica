import { useId, useMemo, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { AIRPORTS, findAirport } from "@/lib/data";

export function AirportPicker({ label, value, onChange, exclude }: { label: string; value: string; onChange: (iata: string) => void; exclude?: string }) {
  const id = useId();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const blurT = useRef<ReturnType<typeof setTimeout>>(undefined);
  const sel = findAirport(value);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return AIRPORTS.filter((a) => a.iata !== exclude && (!s || a.label.toLowerCase().includes(s))).slice(0, 8);
  }, [q, exclude]);

  const pick = (iata: string) => { onChange(iata); setQ(""); setOpen(false); };

  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="relative">
        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          autoComplete="off"
          className="field !pl-9"
          placeholder="City or airport"
          value={open ? q : sel ? `${sel.city} (${sel.iata})` : ""}
          onFocus={() => { setOpen(true); setQ(""); setHi(0); }}
          onBlur={() => { blurT.current = setTimeout(() => setOpen(false), 150); }}
          onChange={(e) => { setQ(e.target.value); setHi(0); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setHi((h) => Math.min(h + 1, list.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
            if (e.key === "Enter" && list[hi]) { e.preventDefault(); pick(list[hi].iata); }
            if (e.key === "Escape") setOpen(false);
          }}
        />
      </div>
      {open && (
        <ul id={`${id}-list`} role="listbox" className="absolute z-30 mt-1 max-h-72 w-full min-w-64 overflow-auto rounded-lg border bg-popover p-1 shadow-elegant">
          {list.length === 0 && <li className="px-3 py-2 text-sm text-muted-foreground">No airports match “{q}”.</li>}
          {list.map((a, i) => (
            <li key={a.iata} role="option" aria-selected={i === hi}
              onMouseDown={(e) => { e.preventDefault(); clearTimeout(blurT.current); pick(a.iata); }}
              className={`cursor-pointer rounded-md px-3 py-2 text-sm ${i === hi ? "bg-secondary" : ""}`}>
              <span className="font-semibold text-navy">{a.city}</span> <span className="text-gold">{a.iata}</span>
              <span className="block truncate text-xs text-muted-foreground">{a.label.split(" · ")[1]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
