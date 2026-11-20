"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Price currency converter for the country pages.
 *
 * Reproduces the source's `currency-selector.js`, which every country page
 * loads. It converts the prices already rendered in the markup — the base
 * amounts come from the page itself, never from us — and offers the local
 * currency plus CLP, MXN and USD.
 *
 * NOTE: rates come from a third-party API, api.frankfurter.dev, cached in
 * localStorage for 12 hours. That is an external dependency the rest of this
 * app does not have; it is kept because the conversion is part of the page
 * being reproduced. If the call fails, prices fall back to the original
 * currency and say so, exactly as the source does.
 *
 * The source reads its base currency from `document.body.dataset`. Here each
 * page passes it as a prop instead, so nothing writes to the shared <body>.
 */

const QUOTES = ["GBP", "CAD", "NZD", "CLP", "MXN", "USD"] as const;
const RATES_URL =
  "https://api.frankfurter.dev/v2/rates?base=EUR&quotes=GBP,CAD,NZD,CLP,MXN,USD";
const PREF_KEY = "mmc-preferred-currency-v1";
const CACHE_KEY = "mmc-fx-rates-eur-v1";
const CACHE_TTL = 12 * 60 * 60 * 1000;

export type BaseCurrency = "EUR" | "GBP" | "CAD" | "NZD";
type Choice = "ORIGINAL" | "CLP" | "MXN" | "USD";

const SYMBOL: Record<BaseCurrency, string> = { EUR: "€", GBP: "£", CAD: "$", NZD: "$" };
const NATIVE_FLAG: Record<BaseCurrency, string> = {
  EUR: "🇮🇪", GBP: "🇬🇧", CAD: "🇨🇦", NZD: "🇳🇿",
};
const FLAG: Record<string, string> = { CLP: "🇨🇱", MXN: "🇲🇽", USD: "🇺🇸" };

type Rates = Record<string, number>;

const format = (value: number, currency: Choice | BaseCurrency) => {
  const amount = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(
    Math.round(value)
  );
  if (currency === "CLP") return `$${amount}`;
  if (currency === "MXN") return `MX$${amount}`;
  if (currency === "USD") return `US$${amount}`;
  return `${SYMBOL[currency as BaseCurrency] ?? ""}${amount}`;
};

const parseRates = (data: unknown): { rates: Rates; date: string } => {
  if (!Array.isArray(data)) throw new Error("Formato FX");
  const rates: Rates = { EUR: 1 };
  let date = "";
  for (const item of data) {
    if (item?.base === "EUR" && Number.isFinite(item?.rate) && item.rate > 0) {
      rates[item.quote] = item.rate;
      date = item.date || date;
    }
  }
  if (!QUOTES.every((q) => rates[q] > 0)) throw new Error("Tasas incompletas");
  return { rates, date };
};

export default function CurrencySelector({ base }: { base: BaseCurrency }) {
  const [choice, setChoice] = useState<Choice>("ORIGINAL");
  const [rates, setRates] = useState<Rates | null>(null);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [host, setHost] = useState<HTMLElement | null>(null);
  const captured = useRef(false);

  // The source appends the control to the page header; the stylesheet positions
  // it there, so it is rendered into the header rather than where it sits in
  // the tree.
  useEffect(() => {
    setHost(document.querySelector<HTMLElement>("header.site-header"));
  }, []);

  /** Snapshot the prices the page rendered, so conversions are reversible. */
  const capture = useCallback(() => {
    if (captured.current) return;
    captured.current = true;
    document.querySelectorAll<HTMLElement>(".compact-prices strong").forEach((el) => {
      const text = el.textContent ?? "";
      if (!/^\s*[€£$]\s*[\d.,]+\s*$/.test(text)) return;
      const amount = Number(text.replace(/[^\d]/g, ""));
      if (!Number.isFinite(amount) || amount <= 0) return;
      el.dataset.mmcBaseAmount = String(amount);
      el.dataset.mmcOriginalText = text.trim();
    });
    document.querySelectorAll<HTMLElement>(".pack-total-note").forEach((el) => {
      const text = (el.textContent ?? "").trim();
      if (/^Precios expresados en /i.test(text)) el.dataset.mmcOriginalNote = text;
    });
  }, []);

  useEffect(() => {
    capture();
    try {
      const saved = localStorage.getItem(PREF_KEY);
      if (saved === "CLP" || saved === "MXN" || saved === "USD" || saved === "ORIGINAL") {
        setChoice(saved);
      }
    } catch {
      /* private mode */
    }
  }, [capture]);

  // Cached rates first, then refresh when the cache is older than 12 hours.
  useEffect(() => {
    let cached: { rates: Rates; date: string; saved: number } | null = null;
    try {
      cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    } catch {
      cached = null;
    }
    const usable =
      cached?.rates && Object.values(cached.rates).every((v) => typeof v === "number" && v > 0);
    if (usable && cached) {
      setRates(cached.rates);
      setDate(cached.date);
    }
    if (usable && cached && Date.now() - (cached.saved ?? 0) <= CACHE_TTL) return;

    let cancelled = false;
    fetch(RATES_URL, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        const fresh = parseRates(data);
        setRates(fresh.rates);
        setDate(fresh.date);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ ...fresh, saved: Date.now() })
          );
        } catch {
          /* private mode */
        }
      })
      .catch(() => {
        if (cancelled) return;
        setRates((current) => {
          if (!current) setStatus("Sin cotización; se muestra la moneda local");
          return current;
        });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Apply the selection to the prices already in the DOM.
  useEffect(() => {
    capture();
    const prices = document.querySelectorAll<HTMLElement>("[data-mmc-base-amount]");
    const notes = document.querySelectorAll<HTMLElement>("[data-mmc-original-note]");

    const restore = () => {
      prices.forEach((el) => {
        if (el.dataset.mmcOriginalText) el.textContent = el.dataset.mmcOriginalText;
        el.removeAttribute("title");
      });
      notes.forEach((el) => {
        if (el.dataset.mmcOriginalNote) el.textContent = el.dataset.mmcOriginalNote;
      });
    };

    if (choice === "ORIGINAL") {
      restore();
      setStatus("");
      return;
    }
    if (!rates || !rates[base] || !rates[choice]) {
      restore();
      setStatus("Tipo de cambio no disponible");
      return;
    }

    const factor = rates[choice] / rates[base];
    prices.forEach((el) => {
      const amount = Number(el.dataset.mmcBaseAmount);
      if (amount > 0) {
        el.textContent = format(amount * factor, choice);
        el.title = `Conversión orientativa a ${choice}`;
      }
    });
    notes.forEach((el) => {
      el.textContent =
        `Importes mostrados en ${choice} con tipo de cambio de referencia ` +
        `(${date || "última actualización disponible"}). El importe final en la ` +
        `moneda seleccionada se confirma al reservar.`;
    });
    setStatus(`Conversión referencial${date ? ` · ${date}` : ""}`);
  }, [choice, rates, date, base, capture]);

  const flag = choice === "ORIGINAL" ? NATIVE_FLAG[base] : FLAG[choice] ?? NATIVE_FLAG[base];

  if (!host) return null;

  return createPortal(
    <div className="mmc-currency-control">
      <span
        className="mmc-currency-flag"
        aria-hidden="true"
        title={choice === "ORIGINAL" ? `Moneda local (${base})` : choice}
      >
        {flag}
      </span>
      <select
        id="mmc-currency-select"
        aria-label="Moneda para mostrar los precios"
        value={choice}
        onChange={(event) => {
          const next = event.target.value as Choice;
          setChoice(next);
          try {
            localStorage.setItem(PREF_KEY, next);
          } catch {
            /* private mode */
          }
        }}
      >
        <option value="ORIGINAL">{base}</option>
        <option value="CLP">CLP</option>
        <option value="MXN">MXN</option>
        <option value="USD">USD</option>
      </select>
      <span className="mmc-fx-state" role="status" aria-live="polite">
        {status}
      </span>
    </div>,
    host
  );
}
