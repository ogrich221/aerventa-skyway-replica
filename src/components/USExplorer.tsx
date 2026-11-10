import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { feature } from "topojson-client";
import { geoPath } from "d3-geo";
import type { Topology, GeometryCollection } from "topojson-specification";
import usTopo from "us-atlas/states-albers-10m.json";
import { Plane, Search } from "lucide-react";
import { US_STATES, cheapestFare } from "@/lib/data";

type UsAirport = (typeof US_STATES)[number]["airports"][number];
import { useCurrency } from "@/lib/currency";
import { defaultDate } from "@/lib/destinations";

const topo = usTopo as unknown as Topology<{ states: GeometryCollection<{ name: string }> }>;
const states = feature(topo, topo.objects.states).features;
const path = geoPath();
const NAMES = new Set(US_STATES.map((s) => s.name));

export function USExplorer() {
  const { fmt } = useCurrency();
  const [sel, setSel] = useState("New York");
  const [dest, setDest] = useState("California");
  const [q, setQ] = useState("");
  const [hover, setHover] = useState<string | null>(null);
  const state = US_STATES.find((s) => s.name === sel)! as (typeof US_STATES)[number] & { airports: [UsAirport, ...UsAirport[]] };
  const destState = (US_STATES.find((s) => s.name === dest) ?? US_STATES[0]!) as typeof state;
  const matches = US_STATES.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.abbr.toLowerCase() === q.toLowerCase());

  const domestic = useMemo(() => {
    const origin = state.airports[0].iata;
    return US_STATES.filter((s) => s.name !== sel)
      .map((s) => ({ s, city: s.airports[0]!.city, iata: s.airports[0]!.iata, fare: cheapestFare(origin, s.airports[0]!.iata) }))
      .sort((a, b) => a.fare - b.fare)
      .slice(0, 6);
  }, [sel, state]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="self-start rounded-2xl bg-navy p-4 shadow-elegant md:p-6">
        <svg viewBox="0 0 975 610" className="h-auto w-full" role="img" aria-label="Interactive map of the United States">
          {states.filter((f) => NAMES.has(f.properties.name)).map((f) => {
            const n = f.properties.name;
            const active = n === sel, isDest = n === dest;
            return (
              <path key={n} d={path(f) ?? ""} tabIndex={0} role="button" aria-label={n}
                onClick={() => setSel(n)} onKeyDown={(e) => e.key === "Enter" && setSel(n)}
                onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(null)}
                className={`cursor-pointer stroke-navy outline-none transition-colors duration-200 ${active ? "fill-gold" : isDest ? "fill-gold-soft" : hover === n ? "fill-navy-foreground/40" : "fill-navy-foreground/15"}`}
                strokeWidth={0.8}>
                <title>{n}</title>
              </path>
            );
          })}
        </svg>
        <div className="mt-3 flex items-center justify-between text-xs text-navy-foreground/70">
          <span>{hover ?? "Click any state to explore"}</span>
          <span className="flex items-center gap-3"><i className="inline-block h-2.5 w-2.5 rounded-sm bg-gold" /> Origin <i className="inline-block h-2.5 w-2.5 rounded-sm bg-gold-soft" /> Destination</span>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground" htmlFor="state-search">Search all 50 states</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input id="state-search" className="field !pl-9" placeholder="e.g. Texas or TX" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          {q && (
            <div className="mt-2 flex max-h-28 flex-wrap gap-1.5 overflow-auto">
              {matches.map((s) => (
                <button key={s.abbr} onClick={() => { setSel(s.name); setQ(""); }} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-navy hover:bg-gold-soft">{s.name}</button>
              ))}
              {matches.length === 0 && <span className="text-xs text-muted-foreground">No state found.</span>}
            </div>
          )}
        </div>

        <div className="rounded-xl border p-5">
          <p className="eyebrow">Airports in {state.name}</p>
          <ul className="mt-3 space-y-2">
            {state.airports.map((a) => (
              <li key={a.iata} className="flex items-center justify-between text-sm">
                <span><span className="font-semibold text-navy">{a.iata}</span> · {a.name}</span>
                <span className="text-muted-foreground">{a.city}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border p-5">
          <p className="eyebrow">Lowest demo fares from {state.airports[0].iata}</p>
          <ul className="mt-3 divide-y">
            {domestic.map(({ s, city, iata, fare }) => (
              <li key={s.abbr}>
                <Link to="/flights" search={{ from: state.airports[0].iata, to: iata, date: defaultDate(), trip: "oneway" }} className="flex items-center justify-between py-2 text-sm hover:text-gold">
                  <span>{city}, {s.abbr}</span>
                  <span className="font-semibold">from {fmt(fare)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-secondary p-5">
          <p className="eyebrow">Route between states</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <select aria-label="Origin state" className="field" value={sel} onChange={(e) => setSel(e.target.value)}>
              {US_STATES.map((s) => <option key={s.abbr}>{s.name}</option>)}
            </select>
            <select aria-label="Destination state" className="field" value={dest} onChange={(e) => setDest(e.target.value)}>
              {US_STATES.filter((s) => s.name !== sel).map((s) => <option key={s.abbr}>{s.name}</option>)}
            </select>
          </div>
          <Link to="/flights" search={{ from: state.airports[0].iata, to: destState.airports[0].iata, date: defaultDate(), trip: "oneway" }}
            className="mt-4 flex items-center justify-center gap-2 rounded-md bg-navy py-3 text-sm font-semibold text-navy-foreground hover:bg-navy-soft">
            <Plane className="h-4 w-4" /> Compare {state.airports[0].iata} → {destState.airports[0].iata}
          </Link>
        </div>
      </div>
    </div>
  );
}
