import { createFileRoute } from "@tanstack/react-router";
import img from "@/assets/hero-aircraft.jpg";
import { PageHero } from "@/components/PageHero";
import { SectionHead, WhyChoose } from "@/components/Sections";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AERVANTA — International Flight Comparison" },
      { name: "description", content: "Learn about AERVANTA, our mission, FAQs, privacy policy and terms." },
      { property: "og:title", content: "About AERVANTA" },
      { property: "og:description", content: "Explore More. Compare Better. Fly Smarter." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const FAQ = [
  ["Does AERVANTA sell tickets?", "No. AERVANTA is a comparison platform. When booking integrations go live, you'll continue to the airline or travel provider to complete your purchase."],
  ["Are the prices live?", "Not yet. Fares currently shown are clearly labelled demonstration data. Live pricing will appear once a flight data provider is connected."],
  ["How is currency conversion handled?", "Prices are converted from USD using indicative rates for comparison only. Final prices are set by the booking provider."],
  ["Which countries are supported?", "86 countries across North America, South America, Europe, Asia, the Middle East and Oceania, plus all 50 US states."],
];

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
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-3xl px-5">
          <SectionHead eyebrow="FAQs" title="Frequently asked questions" />
          <Accordion type="single" collapsible>
            {FAQ.map(([q, a]) => (
              <AccordionItem key={q} value={q}><AccordionTrigger className="text-left text-base text-navy">{q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{a}</AccordionContent></AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <section id="privacy" className="bg-secondary py-16"><div className="mx-auto max-w-3xl px-5"><h2 className="text-3xl font-semibold text-navy">Privacy Policy</h2><p className="mt-3 text-muted-foreground">We collect only what's needed to provide our service, such as your email if you subscribe. We never sell personal data. Your currency preference is stored locally in your browser.</p></div></section>
      <section id="terms" className="py-16"><div className="mx-auto max-w-3xl px-5"><h2 className="text-3xl font-semibold text-navy">Terms</h2><p className="mt-3 text-muted-foreground">Information on AERVANTA is provided for comparison only. Fares currently shown are demonstration data and do not represent offers for sale.</p></div></section>
    </>
  );
}
