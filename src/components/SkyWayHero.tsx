import { Link } from "@tanstack/react-router";
import { Plane, Globe2, Briefcase, ArrowRight, ShieldCheck } from "lucide-react";
import skywayTeam from "@/assets/aervanta-team-banner.jpg";

export function SkyWayHero() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 md:py-32" aria-label="Aervanta Sky Way Showcase">
      {/* Background Image with Cinematic Depth */}
      <div className="absolute inset-0 z-0">
        <img
          src={skywayTeam}
          alt="Aervanta Sky Way — Global Ticket of USA team and official exhibition banner"
          width={1080}
          height={1440}
          loading="lazy"
          className="h-full w-full object-cover object-[center_25%] md:object-[right_25%] opacity-45 lg:opacity-55 scale-105 transition-transform duration-[10000ms] ease-out hover:scale-100"
        />
      </div>

      {/* Luxury Layered Gradients for Text Legibility & Brand Consistency */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy via-navy/95 to-navy/70 lg:from-navy lg:via-navy/90 lg:to-navy/40" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-navy/80" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-navy via-transparent to-background/90" />

      {/* Main Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Text & Features Column */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Glass Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold shadow-lg backdrop-blur-xl">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              <span>Aervanta Sky Way · Global Ticket of USA</span>
            </div>

            {/* Headline */}
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl md:text-6xl">
              Fly. Explore. Connect.
              <span className="block font-sans text-2xl font-normal text-gold sm:text-3xl mt-2 tracking-normal">
                Your Journey... Our Priority.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg leading-relaxed">
              From nationwide travel across all 50 US states to premier international flight routes spanning 86 countries, AERVANTA delivers transparent flight comparison backed by dedicated aviation professionals.
            </p>

            {/* 3 Pillars from Official Sky Way Banner */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/15 bg-navy/60 p-4 backdrop-blur-xl shadow-lg hover:border-gold/50 transition">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/40 bg-gold/15 text-gold">
                  <Plane className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-white">Airline Tickets</h3>
                <p className="mt-1 text-xs text-white/70 leading-relaxed">
                  Fast, transparent airfare comparison across major domestic and international carriers.
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-navy/60 p-4 backdrop-blur-xl shadow-lg hover:border-gold/50 transition">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/40 bg-gold/15 text-gold">
                  <Globe2 className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-white">Global Travel</h3>
                <p className="mt-1 text-xs text-white/70 leading-relaxed">
                  86 destination countries and 50 US states mapped for seamless flight discovery.
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-navy/60 p-4 backdrop-blur-xl shadow-lg hover:border-gold/50 transition">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/40 bg-gold/15 text-gold">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-white">Travel Services</h3>
                <p className="mt-1 text-xs text-white/70 leading-relaxed">
                  Passenger-first support, reliable flight details, and baggage transparency upfront.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/flights"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-gold px-6 py-3.5 text-sm font-semibold text-gold-foreground shadow-gold hover:opacity-95 transition"
              >
                <span>Find Your Flight</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 transition"
              >
                <span>About Aervanta Sky Way</span>
              </Link>
            </div>
          </div>

          {/* Right Showcase Card (Desktop) */}
          <div className="hidden lg:col-span-5 xl:col-span-4 lg:flex justify-center">
            <div className="relative group overflow-hidden rounded-3xl border border-white/25 bg-navy/60 p-3 shadow-2xl backdrop-blur-2xl ring-1 ring-white/15 max-w-sm">
              <div className="overflow-hidden rounded-2xl relative aspect-[3/4]">
                <img
                  src={skywayTeam}
                  alt="Aervanta Sky Way Global Ticket of USA banner and representatives"
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 inset-x-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold">Official Representatives</p>
                  <p className="mt-1 font-display text-xl font-semibold text-white">Aervanta Sky Way</p>
                  <p className="text-xs text-white/80">Global Ticket of USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
