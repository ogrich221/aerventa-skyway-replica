import { createFileRoute } from "@tanstack/react-router";
import img from "@/assets/dest-sydney.jpg";
import { PageHero } from "@/components/PageHero";
import { DemoNote, Inspiration, PopularDestinations, SectionHead } from "@/components/Sections";
import { WorldExplorer } from "@/components/WorldExplorer";
import { USExplorer } from "@/components/USExplorer";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — 86 Countries & All 50 States | AERVANTA" },
      { name: "description", content: "Explore international destinations across North America, South America, Europe, Asia, the Middle East and Oceania." },
      { property: "og:title", content: "Destinations — AERVANTA" },
      { property: "og:description", content: "Explore 86 countries and all 50 US states." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHero img={img} eyebrow="Destinations" title="The world, beautifully mapped." sub="86 countries across six regions and every US state — explore and compare in one place." />
      <section className="py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHead eyebrow="Featured" title="Popular destinations" /><PopularDestinations /><DemoNote /></div></section>
      <section className="bg-secondary py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHead eyebrow="Worldwide" title="International explorer" /><WorldExplorer /></div></section>
      <section className="py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHead eyebrow="Explore America" title="All 50 states" /><USExplorer /></div></section>
      <section className="bg-secondary py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHead eyebrow="Inspiration" title="Journeys to dream about" /><Inspiration /></div></section>
    </>
  ),
});
