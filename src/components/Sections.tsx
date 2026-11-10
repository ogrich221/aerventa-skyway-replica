import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Globe2, Info, Plane, Scale, Search, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { POPULAR, ROUTES, defaultDate } from "@/lib/destinations";
import { cheapestFare } from "@/lib/data";
import { useCurrency } from "@/lib/currency";
import { Button } from "@/components/ui/button";

export function SectionHead({ eyebrow, title, sub, light }: { eyebrow: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 text-4xl font-semibold md:text-5xl ${light ? "text-navy-foreground" : "text-navy"}`}>{title}</h2>
      {sub && <p className={`mt-4 ${light ? "text-navy-foreground/70" : "text-muted-foreground"}`}>{sub}</p>}
    </div>
  );
}

export function DemoNote() {
  return null;
}

export function PopularDestinations({ limit }: { limit?: number }) {
  const { fmt } = useCurrency();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {POPULAR.slice(0, limit).map((d) => (
        <article key={d.city} className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-elegant">
          <img src={d.img} alt={`${d.city}, ${d.country}`} loading="lazy" width={768} height={960} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-card" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-navy-foreground">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">{d.country}</p>
            <h3 className="mt-1 text-3xl font-semibold">{d.city}</h3>
            <p className="mt-1 text-sm text-navy-foreground/80">Fares from <span className="font-semibold text-navy-foreground">{fmt(cheapestFare(d.from, d.iata))}</span> · {d.from}</p>
            <Link to="/flights" search={{ from: d.from, to: d.iata, date: defaultDate(), ret: defaultDate(28), trip: "round" }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-gradient-gold px-4 py-2 text-sm font-semibold text-gold-foreground">
              Explore Flights <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function PopularRoutes() {
  const { fmt } = useCurrency();
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {ROUTES.map((r) => (
        <article key={r.from + r.to} className="group overflow-hidden rounded-2xl border bg-card transition hover:-translate-y-1 hover:shadow-elegant">
          <div className="relative h-36 overflow-hidden">
            <img src={r.img} alt={r.toCity} loading="lazy" width={768} height={960} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between text-navy">
              <div><p className="font-display text-3xl font-semibold">{r.from}</p><p className="text-xs text-muted-foreground">{r.fromCity}</p></div>
              <Plane className="h-5 w-5 text-gold" />
              <div className="text-right"><p className="font-display text-3xl font-semibold">{r.to}</p><p className="text-xs text-muted-foreground">{r.toCity}</p></div>
            </div>
            <div className="mt-4 flex items-end justify-between border-t pt-4">
              <p className="text-xs text-muted-foreground">Fares from<span className="block text-lg font-semibold text-navy">{fmt(cheapestFare(r.from, r.to))}</span></p>
              <Link to="/flights" search={{ from: r.from, to: r.to, date: defaultDate(), ret: defaultDate(28), trip: "round" }} className="rounded-md bg-navy px-3 py-2 text-xs font-semibold text-navy-foreground hover:bg-navy-soft">
                Compare Flights
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

const FEATURES = [
  { icon: Globe2, title: "Global Flight Coverage", text: "86 countries across six regions, plus every US state, in one elegant search." },
  { icon: Scale, title: "Smart Price Comparison", text: "Sort by cheapest, fastest or our balanced recommendation in a single click." },
  { icon: Compass, title: "Easy Flight Discovery", text: "Explore interactive maps to uncover routes you never thought to search." },
  { icon: ShieldCheck, title: "Transparent Flight Information", text: "Duration, stops, baggage and cabin shown upfront. No hidden surprises." },
];

export function WhyChoose() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map(({ icon: I, title, text }) => (
        <div key={title} className="group rounded-2xl border border-navy-foreground/10 bg-navy-soft/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-gold/60">
          <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/50 text-gold transition group-hover:bg-gold group-hover:text-gold-foreground">
            <I className="h-5 w-5" />
          </div>
          <h3 className="mt-6 text-2xl font-semibold text-navy-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-foreground/70">{text}</p>
        </div>
      ))}
    </div>
  );
}

export function HowItWorks() {
  const steps = [
    { icon: Search, t: "Search", d: "Search your departure and destination." },
    { icon: Scale, t: "Compare", d: "Compare available flights and ticket prices." },
    { icon: Plane, t: "Choose", d: "Choose your preferred flight and continue to the booking provider." },
  ];
  return (
    <div className="grid gap-10 md:grid-cols-3">
      {steps.map(({ icon: I, t, d }, i) => (
        <div key={t} className="relative text-center">
          <span className="font-display text-7xl font-semibold text-gold/30">0{i + 1}</span>
          <div className="mx-auto -mt-6 grid h-14 w-14 place-items-center rounded-full bg-navy text-gold shadow-elegant"><I className="h-6 w-6" /></div>
          <h3 className="mt-5 text-2xl font-semibold text-navy">{t}</h3>
          <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{d}</p>
        </div>
      ))}
    </div>
  );
}

export function Inspiration() {
  const [a, b, c, d, e] = [POPULAR[4], POPULAR[6], POPULAR[0], POPULAR[5], POPULAR[9]];
  const items = [
    { ...a, tag: "European Escapes", title: "Golden evenings from Paris to Rome", cls: "md:col-span-2 md:row-span-2" },
    { ...b, tag: "Asian Adventures", title: "Temples, blossoms and neon nights", cls: "" },
    { ...c, tag: "American City Breaks", title: "Skylines worth the window seat", cls: "" },
    { ...d, tag: "Middle Eastern Destinations", title: "Desert luxury, reimagined", cls: "" },
    { ...e, tag: "International Holidays", title: "Harbour summers down under", cls: "" },
  ];
  return (
    <div className="grid auto-rows-[220px] gap-5 md:grid-cols-4">
      {items.map((it) => (
        <Link key={it.tag} to="/destinations" className={`group relative overflow-hidden rounded-2xl ${it.cls}`}>
          <img src={it.img} alt={it.title} loading="lazy" width={768} height={960} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-card" />
          <div className="absolute bottom-0 p-5 text-navy-foreground">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">{it.tag}</p>
            <h3 className="mt-1 text-2xl font-semibold leading-tight md:text-3xl">{it.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState("");
  return (
    <div className="mx-auto max-w-3xl rounded-3xl bg-navy px-6 py-14 text-center shadow-elegant md:px-14">
      <p className="eyebrow">Newsletter</p>
      <h2 className="mt-3 text-4xl font-semibold text-navy-foreground md:text-5xl">Your Next Great Journey Starts in Your Inbox.</h2>
      <p className="mt-4 text-navy-foreground/70">Destination stories and route inspiration, a few times a month.</p>
      <form className="mx-auto mt-8 max-w-lg" onSubmit={(e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Please enter a valid email address.");
        if (!consent) return setErr("Please agree to the privacy policy to subscribe.");
        setErr(""); setEmail(""); setConsent(false);
        toast.success("Thanks! We'll confirm your subscription once our newsletter launches.");
      }}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input id="nl-email" type="email" className="field" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit" variant="gold" size="lg" className="h-auto py-3">Subscribe</Button>
        </div>
        <label className="mt-4 flex items-start justify-center gap-2 text-left text-xs text-navy-foreground/70">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-gold" />
          I agree to receive emails from AERVANTA and accept the privacy policy. Unsubscribe anytime.
        </label>
        <p role="alert" className="mt-2 text-sm text-gold">{err}</p>
      </form>
    </div>
  );
}
