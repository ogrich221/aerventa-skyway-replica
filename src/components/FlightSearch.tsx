import { useNavigate } from "@tanstack/react-router";
import { ArrowLeftRight, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { AirportPicker } from "./AirportPicker";
import { Button } from "@/components/ui/button";
import { CABINS, type Cabin } from "@/lib/data";
import { defaultDate } from "@/lib/destinations";

type Trip = "round" | "oneway" | "multi";

export interface SearchInit { from?: string | undefined; to?: string | undefined; date?: string | undefined; ret?: string | undefined; trip?: Trip | undefined; pax?: number | undefined; cabin?: Cabin | undefined }

export function FlightSearch({ init = {}, compact = false, glass = false }: { init?: SearchInit; compact?: boolean; glass?: boolean }) {
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip>(init.trip ?? "round");
  const [from, setFrom] = useState(init.from ?? "JFK");
  const [to, setTo] = useState(init.to ?? "LHR");
  const [date, setDate] = useState(init.date ?? defaultDate());
  const [ret, setRet] = useState(init.ret ?? defaultDate(28));
  const [pax, setPax] = useState(init.pax ?? 1);
  const [cabin, setCabin] = useState<Cabin>(init.cabin ?? "Economy");
  const [legs, setLegs] = useState<{ from: string; to: string; date: string }[]>([{ from: "LHR", to: "CDG", date: defaultDate(25) }]);
  const [error, setError] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to) return setError("Please choose both a departure and destination airport.");
    if (from === to) return setError("Departure and destination must be different.");
    if (!date || date < today) return setError("Please choose a departure date from today onward.");
    if (trip === "round" && (!ret || ret < date)) return setError("Return date must be after your departure date.");
    setError("");
    navigate({ to: "/flights", search: { from, to, date, ret: trip === "round" ? ret : undefined, trip, pax, cabin } });
  };

  const tabs: [Trip, string][] = [["round", "Round Trip"], ["oneway", "One Way"], ["multi", "Multi-City"]];

  return (
    <form
      onSubmit={submit}
      className={`rounded-2xl transition-all ${compact ? "p-5" : "p-5 md:p-7"} ${
        glass
          ? "bg-transparent text-navy-foreground"
          : "bg-card text-card-foreground shadow-elegant"
      }`}
      aria-label="Flight search"
    >
      <div className="mb-5 flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Trip type">
        {tabs.map(([k, l]) => (
          <button
            type="button"
            role="radio"
            aria-checked={trip === k}
            key={k}
            onClick={() => setTrip(k)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              trip === k
                ? (glass ? "bg-gradient-gold text-gold-foreground font-semibold shadow-gold" : "bg-navy text-navy-foreground")
                : (glass ? "bg-white/10 text-white/90 hover:bg-white/20 border border-white/10 backdrop-blur-sm" : "bg-secondary text-navy hover:bg-gold-soft")
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-12">
        <div className="relative grid gap-4 sm:grid-cols-2 md:col-span-5">
          <AirportPicker label="From" value={from} onChange={setFrom} exclude={to} light={glass} />
          <AirportPicker label="To" value={to} onChange={setTo} exclude={from} light={glass} />
          <button type="button" aria-label="Swap airports" onClick={() => { setFrom(to); setTo(from); }}
            className="absolute left-1/2 top-[2.15rem] z-10 hidden h-8 w-8 -translate-x-1/2 place-items-center rounded-full border bg-background text-gold hover:bg-gold-soft sm:grid">
            <ArrowLeftRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className={`grid gap-4 md:col-span-4 ${trip === "round" ? "grid-cols-2" : "grid-cols-1"}`}>
          <Field label="Depart" light={glass}><input type="date" className="field" min={today} value={date} onChange={(e) => setDate(e.target.value)} required /></Field>
          {trip === "round" && <Field label="Return" light={glass}><input type="date" className="field" min={date} value={ret} onChange={(e) => setRet(e.target.value)} required /></Field>}
        </div>
        <div className="grid grid-cols-2 gap-4 md:col-span-3">
          <Field label="Passengers" light={glass}>
            <select className="field" value={pax} onChange={(e) => setPax(Number(e.target.value))}>
              {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n} {n === 1 ? "Adult" : "Adults"}</option>)}
            </select>
          </Field>
          <Field label="Cabin" light={glass}>
            <select className="field" value={cabin} onChange={(e) => setCabin(e.target.value as Cabin)}>
              {CABINS.map((c) => <option key={c}>{c === "First" ? "First Class" : c}</option>)}
            </select>
          </Field>
        </div>
      </div>

      {trip === "multi" && (
        <div className={`mt-4 space-y-3 rounded-xl p-4 ${glass ? "bg-white/10 border border-white/15 text-white" : "bg-secondary"}`}>
          <p className={`text-xs font-semibold uppercase tracking-widest ${glass ? "text-gold" : "text-muted-foreground"}`}>Additional flights</p>
          {legs.map((l, i) => (
            <div key={i} className="grid items-end gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
              <AirportPicker label={`Flight ${i + 2} from`} value={l.from} onChange={(v) => setLegs(legs.map((x, j) => (j === i ? { ...x, from: v } : x)))} light={glass} />
              <AirportPicker label="To" value={l.to} onChange={(v) => setLegs(legs.map((x, j) => (j === i ? { ...x, to: v } : x)))} light={glass} />
              <Field label="Date" light={glass}><input type="date" className="field" min={date} value={l.date} onChange={(e) => setLegs(legs.map((x, j) => (j === i ? { ...x, date: e.target.value } : x)))} /></Field>
              <button type="button" aria-label="Remove flight" onClick={() => setLegs(legs.filter((_, j) => j !== i))} className={`mb-2 ${glass ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-destructive"}`}><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          {legs.length < 4 && (
            <button type="button" onClick={() => setLegs([...legs, { from: legs.at(-1)?.to ?? to, to: "", date }])} className="flex items-center gap-1 text-sm font-semibold text-gold hover:underline">
              <Plus className="h-4 w-4" /> Add another flight
            </button>
          )}
          <p className={`text-xs ${glass ? "text-navy-foreground/75" : "text-muted-foreground"}`}>Results show the first flight; each additional leg can be compared separately.</p>
        </div>
      )}

      <div className="mt-5 flex flex-col-reverse items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p role="alert" className="text-sm text-destructive">{error}</p>
        <Button type="submit" variant="gold" size="lg" className="h-12 w-full px-10 text-base sm:w-auto">
          <Search /> Search Flights
        </Button>
      </div>
    </form>
  );
}

function Field({ label, light = false, children }: { label: string; light?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={`mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-widest ${light ? "text-navy-foreground/85" : "text-muted-foreground"}`}>{label}</span>
      {children}
    </label>
  );
}
