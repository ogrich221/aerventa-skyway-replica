import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CURRENCIES, formatPrice, type CurrencyCode } from "./data";

const Ctx = createContext<{ currency: CurrencyCode; setCurrency: (c: CurrencyCode) => void; fmt: (usd: number) => string }>({
  currency: "USD",
  setCurrency: () => {},
  fmt: (u) => formatPrice(u, "USD"),
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setC] = useState<CurrencyCode>("USD");
  useEffect(() => {
    const s = localStorage.getItem("aervanta-currency") as CurrencyCode | null;
    if (s && CURRENCIES.some((c) => c.code === s)) setC(s);
  }, []);
  const setCurrency = (c: CurrencyCode) => {
    setC(c);
    localStorage.setItem("aervanta-currency", c);
  };
  return <Ctx.Provider value={{ currency, setCurrency, fmt: (u) => formatPrice(u, currency) }}>{children}</Ctx.Provider>;
}

export const useCurrency = () => useContext(Ctx);
