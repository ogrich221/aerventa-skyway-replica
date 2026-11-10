import { createFileRoute, Link } from "@tanstack/react-router";
import img from "@/assets/hero-aircraft.jpg";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/signin")({
  validateSearch: ({ mode }: Record<string, unknown>): { mode?: "signup" | undefined } => ({ mode: mode === "signup" ? "signup" : undefined }),
  head: () => ({
    meta: [
      { title: "Sign In — AERVANTA" },
      { name: "description", content: "Sign in or create an AERVANTA account." },
      { property: "og:title", content: "Sign In — AERVANTA" },
      { property: "og:description", content: "AERVANTA accounts are coming soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const { mode } = Route.useSearch();
  const signup = mode === "signup";
  return (
    <section className="relative grid min-h-screen place-items-center bg-navy px-5 pb-16 pt-32">
      <img src={img} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="relative w-full max-w-md rounded-2xl bg-card p-8 shadow-elegant">
        <Logo />
        <h1 className="mt-6 text-4xl font-semibold text-navy">{signup ? "Create Account" : "Sign In"}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          AERVANTA accounts are launching soon. You'll be able to save searches, set price alerts and keep your preferred currency across devices.
        </p>
        <p className="mt-3 rounded-lg bg-secondary p-3 text-sm text-navy">In the meantime, every search and comparison feature is available without an account.</p>
        <div className="mt-6 flex items-center justify-between text-sm">
          <Link to="/flights" className="rounded-md bg-gradient-gold px-5 py-2.5 font-semibold text-gold-foreground">Explore Flights</Link>
          <Link to="/signin" search={{ mode: signup ? undefined : "signup" }} className="font-medium text-navy hover:text-gold">
            {signup ? "Have an account? Sign in" : "New here? Create account"}
          </Link>
        </div>
      </div>
    </section>
  );
}
