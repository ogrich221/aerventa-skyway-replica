export function PageHero({ eyebrow, title, sub, img }: { eyebrow: string; title: string; sub: string; img: string }) {
  return (
    <section className="relative overflow-hidden bg-navy pb-20 pt-40">
      <img src={img} alt="" aria-hidden width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="rise mt-4 max-w-3xl text-5xl font-semibold text-navy-foreground md:text-7xl">{title}</h1>
        <p className="mt-5 max-w-xl text-lg text-navy-foreground/80">{sub}</p>
      </div>
    </section>
  );
}
