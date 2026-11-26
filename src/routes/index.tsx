import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { SkyWayHero } from "@/components/SkyWayHero";
import { USExplorer } from "@/components/USExplorer";
import { WorldExplorer } from "@/components/WorldExplorer";
import { HowItWorks, Inspiration, Newsletter, PopularDestinations, PopularRoutes, SectionHead, WhyChoose } from "@/components/Sections";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
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
  const { t } = useLanguage();
  return (
    <>
      <HeroSlideshow />

      <SkyWayHero />

      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead eyebrow={t("popularEyebrow")} title={t("popularTitle")} sub={t("popularSub")} />
          <PopularDestinations />
        </div>
      </section>

      <section id="explore-america" className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead eyebrow={t("exploreAmericaEyebrow")} title={t("exploreAmericaTitle")} sub={t("exploreAmericaSub")} />
          <USExplorer />
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead eyebrow={t("worldEyebrow")} title={t("worldTitle")} sub={t("worldSub")} />
          <WorldExplorer />
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead eyebrow={t("routesEyebrow")} title={t("routesTitle")} />
          <PopularRoutes />
          <div className="mt-10 text-center"><Link to="/routes" className="text-sm font-semibold text-navy hover:text-gold">View all routes →</Link></div>
        </div>
      </section>

      <section className="bg-navy py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead light eyebrow={t("whyChooseEyebrow")} title={t("whyChooseTitle")} />
          <WhyChoose />
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead eyebrow={t("howItWorksEyebrow")} title={t("howItWorksTitle")} />
          <HowItWorks />
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHead eyebrow={t("inspirationEyebrow")} title={t("inspirationTitle")} />
          <Inspiration />
        </div>
      </section>

      <section className="bg-background px-5 py-24">
        <Newsletter />
      </section>
    </>
  );
}
