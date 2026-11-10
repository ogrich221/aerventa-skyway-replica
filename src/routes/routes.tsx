import { createFileRoute } from "@tanstack/react-router";
import img from "@/assets/dest-london.jpg";
import { PageHero } from "@/components/PageHero";
import { DemoNote, HowItWorks, PopularRoutes, SectionHead } from "@/components/Sections";

export const Route = createFileRoute("/routes")({
  head: () => ({
    meta: [
      { title: "Popular Flight Routes — Compare Fares | AERVANTA" },
      { name: "description", content: "Compare popular routes like New York to London, Los Angeles to Tokyo and San Francisco to Sydney." },
      { property: "og:title", content: "Popular Flight Routes — AERVANTA" },
      { property: "og:description", content: "Compare the world's favourite flight routes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHero img={img} eyebrow="Popular routes" title="The journeys travellers love." sub="From transatlantic classics to trans-Pacific adventures." />
      <section className="py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><PopularRoutes /><DemoNote /></div></section>
      <section className="bg-secondary py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionHead eyebrow="How it works" title="Three steps to take-off" /><HowItWorks /></div></section>
    </>
  ),
});
