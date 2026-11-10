import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AlertCircle, Briefcase, Clock, Info, Plane, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { FlightSearch } from "@/components/FlightSearch";
import { AIRLINES, CABINS, findAirport, fmtDur, fmtTime, generateFlights, type Cabin, type Flight } from "@/lib/data";
import { useCurrency } from "@/lib/currency";
import { defaultDate } from "@/lib/destinations";
import { Button } from "@/components/ui/button";

type Trip = "round" | "oneway" | "multi";
interface FlightSearchParams { from?: string; to?: string; date?: string; ret?: string; trip?: Trip; pax?: number; cabin?: Cabin }

export const Route = createFileRoute("/flights")({
  validateSearch: (s: Record<string, unknown>): FlightSearchParams => ({
    from: typeof s.from === "string" ? s.from.toUpperCase() : undefined,
    to: typeof s.to === "string" ? s.to.toUpperCase() : undefined,
    date: typeof s.date === "string" ? s.date : undefined,
    ret: typeof s.ret === "string" ? s.ret : undefined,
    trip: s.trip === "round" || s.trip === "oneway" || s.trip === "multi" ? s.trip : undefined,
    pax: Number(s.pax) >= 1 && Number(s.pax) <= 9 ? Number(s.pax) : undefined,
    cabin: CABINS.includes(s.cabin as Cabin) ? (s.cabin as Cabin) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Explore Flights — Compare Fares | AERVANTA" },
      { name: "description", content: "Compare flights by price, duration, stops, airline and departure time with AERVANTA." },
      { property: "og:title", content: "Explore Flights — AERVANTA" },
      { property: "og:description", content: "Compare flights by price, duration, stops and airline." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FlightsPage,
});

type Sort = "recommended" | "cheapest" | "fastest";
const TIME_BANDS = [
  { k: "morning", l: "Morning (05–12)", t: (m: number) => m >= 300 && m < 720 },
  { k: "afternoon", l: "Afternoon (12–18)", t: (m: number) => m >= 720 && m < 1080 },
  { k: "evening", l: "Evening (18–24)", t: (m: number) => m >= 1080 },
  { k: "night", l: "Night (00–05)", t: (m: number) => m < 300 },
];

function FlightsPage() {
  const s = Route.useSearch();
  const from = s.from ?? "JFK", to = s.to ?? "LHR", date = s.date ?? defaultDate(), cabin = s.cabin ?? "Economy", pax = s.pax ?? 1;
  const { fmt } = useCurrency();
  const fromA = findAirport(from), toA = findAirport(to);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<Sort>("recommended");
  const [stops, setStops] = useState<number[]>([]);
  const [airlines, setAirlines] = useState<string[]>([]);
  const [bands, setBands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const flights = useMemo(() => (fromA && toA && from !== to ? generateFlights(from, to, date, cabin) : []), [from, to, date, cabin, fromA, toA]);
  const priceMax = flights.length ? Math.max(...flights.map((f) => f.priceUsd)) : 0;
  const priceMin = flights.length ? Math.min(...flights.map((f) => f.priceUsd)) : 0;

  useEffect(() => {
    setLoading(true); setMaxPrice(null); setStops([]); setAirlines([]); setBands([]);
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [from, to, date, cabin]);

  const shown = useMemo(() => {
    let r = flights.filter((f) =>
      (!stops.length || stops.includes(Math.min(f.stops, 2))) &&
      (!airlines.length || airlines.includes(f.airline.code)) &&
      (!bands.length || TIME_BANDS.some((b) => bands.includes(b.k) && b.t(f.depart))) &&
      (maxPrice === null || f.priceUsd <= maxPrice));
    r = [...r].sort((a, b) => sort === "cheapest" ? a.priceUsd - b.priceUsd : sort === "fastest" ? a.durationMin - b.durationMin : b.score - a.score);
    return r;
  }, [flights, stops, airlines, bands, maxPrice, sort]);

  const best = (k: Sort) => {
    if (!flights.length) return null;
    const f = [...flights].sort((a, b) => k === "cheapest" ? a.priceUsd - b.priceUsd : k === "fastest" ? a.durationMin - b.durationMin : b.score - a.score)[0];
    return `${fmt(f.priceUsd * pax)} · ${fmtDur(f.durationMin)}`;
  };
  const toggle = <T,>(arr: T[], v: T, set: (x: T[]) => void) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const invalid = !fromA || !toA || from === to;

  return (
    <div className="bg-secondary pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <FlightSearch key={`${from}${to}${date}${cabin}`} compact init={{ ...s, from, to, date, cabin, pax }} />

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold/50 bg-gold-soft/40 p-4 text-sm text-navy">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p><strong>Demonstration data.</strong> These flights and fares are sample results to preview the comparison experience. They are not live prices and cannot be booked yet.</p>
        </div>

        {invalid ? (
          <div className="mt-10 rounded-2xl bg-card p-10 text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-destructive" />
            <h2 className="mt-4 text-3xl font-semibold text-navy">We couldn't find that route</h2>
            <p className="mt-2 text-muted-foreground">Please choose two different supported airports in the search above.</p>
          </div>
        ) : (
          <>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">{fromA.city} → {toA.city}</p>
                <h1 className="text-4xl font-semibold text-navy">{from} to {to}</h1>
                <p className="text-sm text-muted-foreground">{new Date(date + "T00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · {pax} {pax === 1 ? "adult" : "adults"} · {cabin}</p>
              </div>
              <button className="flex items-center gap-2 rounded-md border bg-card px-4 py-2 text-sm font-medium lg:hidden" onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters}>
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
              <aside className={`${showFilters ? "block" : "hidden"} space-y-6 self-start rounded-2xl bg-card p-6 lg:block`} aria-label="Filters">
                <FilterGroup title="Stops">
                  {[[0, "Nonstop"], [1, "1 stop"], [2, "2+ stops"]].map(([v, l]) => (
                    <Check key={v} label={l as string} checked={stops.includes(v as number)} onChange={() => toggle(stops, v as number, setStops)} />
                  ))}
                </FilterGroup>
                <FilterGroup title={`Max price ${maxPrice !== null ? `· ${fmt(maxPrice)}` : ""}`}>
                  <input type="range" aria-label="Maximum price" className="w-full accent-gold" min={priceMin} max={priceMax} value={maxPrice ?? priceMax} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                  <div className="flex justify-between text-xs text-muted-foreground"><span>{fmt(priceMin)}</span><span>{fmt(priceMax)}</span></div>
                </FilterGroup>
                <FilterGroup title="Departure time">
                  {TIME_BANDS.map((b) => <Check key={b.k} label={b.l} checked={bands.includes(b.k)} onChange={() => toggle(bands, b.k, setBands)} />)}
                </FilterGroup>
                <FilterGroup title="Airlines">
                  {AIRLINES.filter((a) => flights.some((f) => f.airline.code === a.code)).map((a) => (
                    <Check key={a.code} label={a.name} checked={airlines.includes(a.code)} onChange={() => toggle(airlines, a.code, setAirlines)} />
                  ))}
                </FilterGroup>
                <button className="text-sm font-semibold text-gold hover:underline" onClick={() => { setStops([]); setAirlines([]); setBands([]); setMaxPrice(null); }}>Reset filters</button>
              </aside>

              <div>
                <div className="grid grid-cols-3 overflow-hidden rounded-2xl bg-card" role="tablist" aria-label="Sort flights">
                  {(["recommended", "cheapest", "fastest"] as Sort[]).map((k) => (
                    <button key={k} role="tab" aria-selected={sort === k} onClick={() => setSort(k)}
                      className={`border-b-2 px-3 py-4 text-left transition ${sort === k ? "border-gold bg-gold-soft/30" : "border-transparent hover:bg-secondary"}`}>
                      <span className="block text-sm font-semibold capitalize text-navy">{k}</span>
                      <span className="block text-xs text-muted-foreground">{loading ? "…" : best(k)}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 space-y-4" aria-live="polite" aria-busy={loading}>
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-36 animate-pulse rounded-2xl bg-card" />)
                  ) : shown.length === 0 ? (
                    <div className="rounded-2xl bg-card p-10 text-center text-muted-foreground">No flights match these filters. Try widening your selection.</div>
                  ) : (
                    shown.map((f) => <FlightCard key={f.id} f={f} pax={pax} fmt={fmt} />)
                  )}
                </div>
                {!loading && <p className="mt-4 text-xs text-muted-foreground">{shown.length} of {flights.length} demo flights shown · prices are totals for {pax} {pax === 1 ? "passenger" : "passengers"}.</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FlightCard({ f, pax, fmt }: { f: Flight; pax: number; fmt: (n: number) => string }) {
  return (
    <article className="grid gap-5 rounded-2xl bg-card p-5 transition hover:shadow-elegant md:grid-cols-[180px_1fr_200px] md:items-center md:p-6">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-navy font-display text-lg font-bold text-gold" aria-hidden>{f.airline.code}</div>
        <div><p className="text-sm font-semibold text-navy">{f.airline.name}</p><p className="text-xs text-muted-foreground">{f.flightNo}</p></div>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <div><p className="text-2xl font-semibold text-navy">{fmtTime(f.depart)}</p><p className="text-xs text-muted-foreground">{f.from}</p></div>
          <div className="flex-1 text-center">
            <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {fmtDur(f.durationMin)}</p>
            <div className="relative my-1 h-px bg-border"><Plane className="absolute -top-2 right-0 h-4 w-4 text-gold" /></div>
            <p className={`text-xs font-medium ${f.stops === 0 ? "text-gold" : "text-muted-foreground"}`}>{f.stops === 0 ? "Nonstop" : `${f.stops} stop${f.stops > 1 ? "s" : ""} · ${f.stopVia}`}</p>
          </div>
          <div className="text-right"><p className="text-2xl font-semibold text-navy">{fmtTime(f.depart + f.durationMin)}{f.depart + f.durationMin >= 1440 && <sup className="text-xs text-gold">+{Math.floor((f.depart + f.durationMin) / 1440)}</sup>}</p><p className="text-xs text-muted-foreground">{f.to}</p></div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1"><Briefcase className="h-3 w-3" /> {f.baggage}</span>
          <span className="rounded-full bg-secondary px-2.5 py-1">{f.cabin}</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t pt-4 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-6 md:pt-0">
        <div className="md:text-right"><p className="text-xs text-muted-foreground">Total (demo)</p><p className="font-display text-3xl font-semibold text-navy">{fmt(f.priceUsd * pax)}</p></div>
        <Button variant="gold" onClick={() => toast.info("Booking providers aren't connected yet. This is demonstration data.")}>View Deal</Button>
      </div>
    </article>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return <fieldset><legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</legend><div className="space-y-2">{children}</div></fieldset>;
}
function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return <label className="flex cursor-pointer items-center gap-2 text-sm text-navy"><input type="checkbox" className="h-4 w-4 accent-gold" checked={checked} onChange={onChange} /> {label}</label>;
}
