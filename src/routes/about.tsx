import { createFileRoute } from "@tanstack/react-router";
import img from "@/assets/hero-aircraft.jpg";
import { PageHero } from "@/components/PageHero";
import { SectionHead, WhyChoose } from "@/components/Sections";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "About AERVANTA — International Flight Comparison" },
      { name: "description", content: "Learn about AERVANTA, our mission, privacy policy and terms." },
      { property: "og:title", content: "About AERVANTA" },
      { property: "og:description", content: "Explore More. Compare Better. Fly Smarter." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero img={img} eyebrow="About us" title="Built for travellers who expect more." sub="AERVANTA brings clarity and elegance to international flight comparison." />
      <section className="py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 lg:px-8">
          <div><p className="eyebrow">Our mission</p><h2 className="mt-3 text-4xl font-semibold text-navy">Explore More. Compare Better. Fly Smarter.</h2></div>
          <p className="text-lg leading-relaxed text-muted-foreground">We believe finding the right flight should feel as considered as the journey itself. AERVANTA presents flight options with transparent details — duration, stops, baggage and cabin — so you can compare with confidence and continue to the provider you trust.</p>
        </div>
      </section>
      <section className="bg-navy py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHead light eyebrow="What we offer" title="Comparison, elevated" /><WhyChoose /></div></section>
      <section id="privacy" className="bg-secondary py-16"><div className="mx-auto max-w-3xl px-5"><h2 className="text-3xl font-semibold text-navy">Privacy Policy</h2><p className="mt-3 text-muted-foreground">We collect only what's needed to provide our service, such as your email if you subscribe. We never sell personal data. Your currency preference is stored locally in your browser.</p></div></section>
      <section id="terms" className="py-16"><div className="mx-auto max-w-3xl px-5"><h2 className="text-3xl font-semibold text-navy">Terms</h2><p className="mt-3 text-muted-foreground">Information on AERVANTA is provided for comparison only. Fares and flight schedules are subject to airline availability and provider confirmation.</p></div></section>
    </>
  );
}
