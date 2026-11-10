import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-aircraft.jpg";
import { FlightSearch } from "@/components/FlightSearch";
import { USExplorer } from "@/components/USExplorer";
import { WorldExplorer } from "@/components/WorldExplorer";
import { DemoNote, HowItWorks, Inspiration, Newsletter, PopularDestinations, PopularRoutes, SectionHead, WhyChoose } from "@/components/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AERVANTA — Compare International Flights | Fly Smarter" },
      { name: "description", content: "Compare flight prices, discover international destinations across 86 countries and all 50 US states with AERVANTA." },
      { property: "og:title", content: "AERVANTA — Your Next Destination Starts Here" },
      { property: "og:description", content: "Explore More. Compare Better. Fly Smarter." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-navy pb-16 pt-32">
        <img src={hero} alt="Passenger aircraft flying above the clouds at sunset" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="rise max-w-3xl">
            <p className="eyebrow">Explore More · Compare Better · Fly Smarter</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] text-navy-foreground md:text-7xl lg:text-8xl">
              Your Next Destination Starts Here.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-navy-foreground/85">
              Compare flight prices, discover international destinations and find better airfare options with AERVANTA.
            </p>
          </div>
          <div className="rise mt-12" style={{ animationDelay: "0.2s" }}>
            <FlightSearch />
          </div>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead eyebrow="Popular destinations" title="Where the world is flying" sub="Twelve iconic cities, one elegant comparison." />
          <PopularDestinations />
          <DemoNote />
        </div>
      </section>

      <section id="explore-america" className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead eyebrow="Explore America" title="Fifty states. Endless routes." sub="Select any state to discover its airports, domestic fares and routes across the country." />
          <USExplorer />
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead eyebrow="International destinations" title="A world of routes" sub="Tap a highlighted country on the map or browse by region." />
          <WorldExplorer />
          <DemoNote />
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead eyebrow="Popular routes" title="Favourite journeys" />
          <PopularRoutes />
          <div className="mt-10 text-center"><Link to="/routes" className="text-sm font-semibold text-navy hover:text-gold">View all routes →</Link></div>
        </div>
      </section>

      <section className="bg-navy py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead light eyebrow="Why choose AERVANTA" title="Comparison, elevated" />
          <WhyChoose />
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead eyebrow="How it works" title="Three steps to take-off" />
          <HowItWorks />
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead eyebrow="Travel inspiration" title="Stories for the window seat" />
          <Inspiration />
        </div>
      </section>

      <section className="bg-background px-5 py-24">
        <Newsletter />
      </section>
    </>
  );
}
