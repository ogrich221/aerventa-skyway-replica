import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { CURRENCIES, type CurrencyCode } from "@/lib/data";
import { useCurrency } from "@/lib/currency";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/flights", label: "Explore Flights" },
  { to: "/destinations", label: "Destinations" },
  { to: "/routes", label: "Popular Routes" },
  { to: "/about", label: "About Us" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { currency, setCurrency } = useCurrency();
  const overHero = path === "/" && !scrolled;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const text = overHero ? "text-navy-foreground" : "text-navy";
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${overHero ? "bg-transparent" : "bg-background/95 shadow-sm backdrop-blur"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo light={overHero} />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={`text-sm font-medium transition-colors hover:text-gold ${text}`} activeProps={{ className: "!text-gold" }} activeOptions={{ exact: true }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <label className="sr-only" htmlFor="currency">Currency</label>
          <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className={`cursor-pointer rounded-md border bg-transparent px-2 py-1.5 text-xs font-semibold ${overHero ? "border-navy-foreground/30 text-navy-foreground" : "border-border text-navy"}`}>
            {CURRENCIES.map((c) => <option key={c.code} value={c.code} className="text-navy">{c.code}</option>)}
          </select>
          <Link to="/signin" className={`text-sm font-medium hover:text-gold ${text}`}>Sign In</Link>
          <Link to="/signin" search={{ mode: "signup" }} className="rounded-md bg-gradient-gold px-4 py-2 text-sm font-semibold text-gold-foreground shadow-gold">Create Account</Link>
        </div>
        <button className={`lg:hidden ${text}`} onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-background px-5 pb-6 pt-2 lg:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="block border-b py-3 text-base font-medium text-navy">{n.label}</Link>
          ))}
          <div className="mt-4 flex items-center gap-3">
            <select aria-label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value as CurrencyCode)} className="field !w-auto">
              {CURRENCIES.map((c) => <option key={c.code}>{c.code}</option>)}
            </select>
            <Link to="/signin" className="text-sm font-medium text-navy">Sign In</Link>
            <Link to="/signin" search={{ mode: "signup" }} className="rounded-md bg-gradient-gold px-4 py-2 text-sm font-semibold text-gold-foreground">Create Account</Link>
          </div>
        </div>
      )}
    </header>
  );
}
