import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plane, Compass, Box, Sparkles } from "lucide-react";
import heroCommercial from "@/assets/hero-commercial.jpg";
import heroHelicopter from "@/assets/hero-helicopter.jpg";
import heroCargo from "@/assets/hero-cargo.jpg";
import { FlightSearch } from "@/components/FlightSearch";
import { useLanguage } from "@/lib/language";

interface Slide {
  id: string;
  img: string;
  alt: string;
  badge: string;
  eyebrowKey?: "heroEyebrow";
  eyebrowFallback: string;
  titleKey?: "heroTitle";
  titleFallback: string;
  subKey?: "heroSub";
  subFallback: string;
  category: string;
  caption: string;
  highlight: string;
  icon: typeof Plane;
}

const SLIDES: Slide[] = [
  {
    id: "commercial",
    img: heroCommercial,
    alt: "Modern widebody commercial passenger aircraft soaring through golden hour clouds",
    badge: "Commercial Fleet · Global Reach",
    eyebrowKey: "heroEyebrow",
    eyebrowFallback: "Explore More · Compare Better · Fly Smarter",
    titleKey: "heroTitle",
    titleFallback: "Your Next Destination Starts Here.",
    subKey: "heroSub",
    subFallback: "Compare flight prices, discover international destinations and find better airfare options with AERVANTA.",
    category: "Commercial Flights",
    caption: "Modern Passenger Aircraft in Flight",
    highlight: "86 Countries & 50 US States",
    icon: Plane,
  },
  {
    id: "helicopter",
    img: heroHelicopter,
    alt: "Powerful VIP executive helicopter in dynamic flight over mountain ridges",
    badge: "Executive Aviation · Speed & Precision",
    eyebrowFallback: "Private Aviation · Point-To-Point Precision",
    titleFallback: "Point-to-Point Luxury Helicopter Travel.",
    subFallback: "Engineered for time-critical executive journeys, alpine transfers, and bespoke point-to-point travel with absolute exclusivity.",
    category: "Private Helicopters",
    caption: "Executive VIP Helicopter in Flight",
    highlight: "Exclusivity & Precision",
    icon: Compass,
  },
  {
    id: "cargo",
    img: heroCargo,
    alt: "Heavy-lift cargo aircraft loading freight at an international airport at twilight",
    badge: "Air Freight · Operational Excellence",
    eyebrowFallback: "Heavy Logistics · Global Supply Lines",
    titleFallback: "High-Capacity Air Freight & Heavy Logistics.",
    subFallback: "Massive payload capabilities and worldwide logistics networks delivering mission-critical air cargo across continents.",
    category: "Heavy-Lift Cargo",
    caption: "Heavy-Lift Cargo Transport Aircraft",
    highlight: "Strength & Logistics Reach",
    icon: Box,
  },
];

const SLIDE_DURATION = 7000; // 7 seconds per slide for a majestic, calm transition

export function HeroSlideshow() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setActive((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActive((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, active]);

  // Touch handlers for mobile & tablet swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  const currentSlide = SLIDES[active]!;
  const eyebrowText = currentSlide.eyebrowKey ? t(currentSlide.eyebrowKey) : currentSlide.eyebrowFallback;
  const titleText = currentSlide.titleKey ? t(currentSlide.titleKey) : currentSlide.titleFallback;
  const subText = currentSlide.subKey ? t(currentSlide.subKey) : currentSlide.subFallback;

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-navy pb-16 pt-32 lg:pt-36"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Aviation showcase slideshow"
    >
      {/* Background Slides Stack with Cinematic Slow Crossfade */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === active;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <img
                src={slide.img}
                alt={slide.alt}
                width={1920}
                height={1080}
                fetchPriority={idx === 0 ? "high" : "auto"}
                loading={idx === 0 ? "eager" : "lazy"}
                className={`h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Layered Cinematic Overlays for Readability & Depth */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy via-navy/60 to-navy/75" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy/85 via-navy/50 to-transparent" />
      <div className="absolute inset-0 z-10 bg-radial-[at_50%_40%] from-transparent via-navy/30 to-navy/85" />

      {/* Slide Navigation Arrows (Desktop & Tablet) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-30 mx-auto hidden max-w-7xl items-center justify-between px-5 sm:flex lg:px-8">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous aviation slide"
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-navy/40 text-white/80 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold hover:bg-navy/80 hover:text-gold shadow-lg"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next aviation slide"
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-navy/40 text-white/80 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold hover:bg-navy/80 hover:text-gold shadow-lg"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-4xl">
          {/* Glass Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-navy/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold shadow-lg backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" />
            <span>{currentSlide.badge}</span>
          </div>

          {/* Animated Slide Headline */}
          <div key={currentSlide.id} className="rise mt-4">
            <p className="eyebrow text-gold/90">{eyebrowText}</p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.05] text-navy-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              {titleText}
            </h1>
            <p className="mt-5 max-w-2xl text-base text-navy-foreground/85 sm:text-lg md:text-xl leading-relaxed">
              {subText}
            </p>
          </div>
        </div>

        {/* Glassmorphic Flight Search Card */}
        <div className="rise mt-10 md:mt-12" style={{ animationDelay: "0.15s" }}>
          <div className="rounded-3xl border border-white/25 bg-navy/60 p-2 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)] backdrop-blur-2xl ring-1 ring-white/10 sm:p-3">
            <FlightSearch glass />
          </div>
        </div>

        {/* Premium Glass Slide Selector / Progress Tabs */}
        <div className="mt-10 lg:mt-12">
          <div className="grid gap-3 sm:grid-cols-3">
            {SLIDES.map((slide, idx) => {
              const isActive = idx === active;
              const Icon = slide.icon;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 backdrop-blur-xl ${
                    isActive
                      ? "border-gold/80 bg-navy/75 shadow-[0_10px_30px_rgba(214,181,109,0.2)] ring-1 ring-gold/40"
                      : "border-white/15 bg-navy/40 hover:border-white/30 hover:bg-navy/60"
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                          isActive
                            ? "border-gold/60 bg-gold/15 text-gold"
                            : "border-white/10 bg-white/5 text-white/70 group-hover:text-gold"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                        {slide.category}
                      </span>
                    </div>
                    <span className="font-display text-sm font-bold text-gold/80">
                      0{idx + 1}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-1 text-xs text-navy-foreground/75">
                    {slide.highlight}
                  </p>

                  {/* Animated Progress Bar on Active Tab */}
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/15">
                    {isActive ? (
                      <div
                        key={`bar-${active}-${isPaused}`}
                        className="h-full bg-gradient-to-r from-gold to-amber-300"
                        style={{
                          animation: isPaused
                            ? "none"
                            : `heroProgress ${SLIDE_DURATION}ms linear forwards`,
                          width: isPaused ? "100%" : undefined,
                        }}
                      />
                    ) : (
                      <div className="h-full w-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile Dot Navigation */}
          <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === active ? "w-8 bg-gold shadow-gold" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress animation keyframe */}
      <style>{`
        @keyframes heroProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
