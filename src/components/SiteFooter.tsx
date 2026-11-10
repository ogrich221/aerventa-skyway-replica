import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-foreground/70">
            AERVANTA is an international flight comparison platform. We help travellers compare airfares and
            continue to trusted booking providers.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Twitter, Linkedin].map((I, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-full border border-navy-foreground/20 transition hover:border-gold hover:text-gold">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <FooterCol title="Flight Search" items={[["Explore Flights", "/flights"], ["Destinations", "/destinations"], ["Popular Routes", "/routes"], ["About Us", "/about"]]} />
        <FooterCol title="Destinations" items={[["New York", "/destinations"], ["London", "/destinations"], ["Dubai", "/destinations"], ["Tokyo", "/destinations"], ["Sydney", "/destinations"]]} />
        <div>
          <h4 className="eyebrow">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/75">
            <li className="flex gap-2"><Mail className="h-4 w-4 text-gold" /> hello@aervanta.com</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-gold" /> +1 (000) 000-0000</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-gold" /> New York, USA</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-navy-foreground/60 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} AERVANTA. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/about" hash="faq" className="hover:text-gold">FAQs</Link>
            <Link to="/about" hash="privacy" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/about" hash="terms" className="hover:text-gold">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, "/flights" | "/destinations" | "/routes" | "/about"][] }) {
  return (
    <div>
      <h4 className="eyebrow">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/75">
        {items.map(([l, to]) => (
          <li key={l}><Link to={to} className="hover:text-gold">{l}</Link></li>
        ))}
      </ul>
    </div>
  );
}
