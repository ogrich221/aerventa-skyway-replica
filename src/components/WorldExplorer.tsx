import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { feature } from "topojson-client";
import { geoEquirectangular, geoPath } from "d3-geo";
import type { Topology, GeometryCollection } from "topojson-specification";
import worldTopo from "world-atlas/countries-110m.json";
import { Search } from "lucide-react";
import { COUNTRIES, REGIONS, cheapestFare, type Region } from "@/lib/data";
import { useCurrency } from "@/lib/currency";
import { defaultDate } from "@/lib/destinations";

const topo = worldTopo as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
const shapes = feature(topo, topo.objects.countries).features.filter((f) => f.properties.name !== "Antarctica");
const W = 960, H = 470;
const proj = geoEquirectangular().scale(153).translate([W / 2, H / 2 + 40]);
const path = geoPath(proj);

const ALIAS: Record<string, string> = {
  "United States of America": "United States", "Czechia": "Czech Republic", "Dominican Rep.": "Dominican Republic",
  "Fr. Polynesia": "French Polynesia", "Korea": "South Korea", "S. Korea": "South Korea", "Republic of Korea": "South Korea",
};
const BY_NAME = new Map(COUNTRIES.map((c) => [c.name, c]));

export function WorldExplorer({ origin = "JFK" }: { origin?: string }) {
  const { fmt } = useCurrency();
  const [region, setRegion] = useState<Region | "All">("All");
  const [sel, setSel] = useState("United Kingdom");
  const [q, setQ] = useState("");
  const country = BY_NAME.get(sel)!;
  const originC = [-73.8, 40.6] as [number, number];

  const list = useMemo(
    () => COUNTRIES.filter((c) => c.iata !== origin && (region === "All" || c.region === region) && (!q || `${c.name} ${c.hub}`.toLowerCase().includes(q.toLowerCase()))),
    [region, q, origin],
  );
  const [ox, oy] = proj(originC)!;
  const [dx, dy] = proj([country.lon, country.lat])!;
  const mx = (ox + dx) / 2, my = Math.min(oy, dy) - Math.abs(dx - ox) * 0.18 - 20;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-navy p-3 shadow-elegant md:p-6">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="World map of supported destinations">
          {shapes.map((f, i) => {
            const name = ALIAS[f.properties.name] ?? f.properties.name;
            const c = BY_NAME.get(name);
            return (
              <path key={i} d={path(f) ?? ""} strokeWidth={0.4}
                onClick={c && c.iata !== origin ? () => setSel(c.name) : undefined}
                className={`stroke-navy transition-colors ${c ? (c.name === sel ? "fill-gold" : "cursor-pointer fill-navy-foreground/30 hover:fill-gold-soft") : "fill-navy-foreground/8"}`}>
                <title>{name}{c ? "" : " (not currently supported)"}</title>
              </path>
            );
          })}
          <path key={sel} d={`M${ox},${oy} Q${mx},${my} ${dx},${dy}`} fill="none" className="route-draw stroke-gold" strokeWidth={1.8} strokeDasharray="600" />
          {COUNTRIES.map((c) => {
            const [x, y] = proj([c.lon, c.lat])!;
            return <circle key={c.code} cx={x} cy={y} r={c.name === sel ? 4.5 : 2} className={`fill-gold ${c.iata !== origin ? "cursor-pointer" : ""}`} onClick={() => c.iata !== origin && setSel(c.name)}><title>{c.hub}, {c.name}</title></circle>;
          })}
          <circle cx={ox} cy={oy} r={5} className="fill-navy-foreground" />
        </svg>
        <div className="absolute bottom-4 left-4 max-w-xs rounded-xl bg-background/95 p-4 shadow-elegant backdrop-blur md:bottom-8 md:left-8">
          <p className="eyebrow">{country.region}</p>
          <p className="font-display text-2xl font-semibold text-navy">{country.hub}, {country.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">New York (JFK) → {country.iata} · demo fare from <span className="font-semibold text-navy">{fmt(cheapestFare(origin, country.iata))}</span></p>
          <Link to="/flights" search={{ from: origin, to: country.iata, date: defaultDate(), ret: defaultDate(30), trip: "round" }} className="mt-3 inline-block text-sm font-semibold text-gold hover:underline">Explore routes →</Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Regions">
          {(["All", ...REGIONS] as const).map((r) => (
            <button key={r} role="tab" aria-selected={region === r} onClick={() => setRegion(r)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${region === r ? "bg-navy text-navy-foreground" : "bg-secondary text-navy hover:bg-gold-soft"}`}>
              {r}
            </button>
          ))}
        </div>
        <div className="relative md:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input aria-label="Search countries" className="field !pl-9" placeholder={`Search ${COUNTRIES.length} countries`} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((c) => (
          <button key={c.code} onClick={() => setSel(c.name)}
            className={`group flex items-center justify-between rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-gold hover:shadow-elegant ${c.name === sel ? "border-gold bg-gold-soft/40" : ""}`}>
            <span>
              <span className="block font-semibold text-navy">{c.name}</span>
              <span className="text-xs text-muted-foreground">{c.hub} · {c.iata}</span>
            </span>
            <span className="text-right text-xs text-muted-foreground">from<span className="block text-sm font-semibold text-navy">{fmt(cheapestFare(origin, c.iata))}</span></span>
          </button>
        ))}
        {list.length === 0 && <p className="col-span-full py-8 text-center text-sm text-muted-foreground">No supported countries match your search.</p>}
      </div>
    </div>
  );
}
