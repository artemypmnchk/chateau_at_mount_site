"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/lib/content";

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Хелпер: достаёт строку нужного языка из словаря { ru, en }. */
  L: (s: Record<Locale, string>) => string;
}

const Ctx = createContext<LocaleCtx | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");

  // Восстанавливаем выбор языка из localStorage на клиенте (один раз при монтировании).
  useEffect(() => {
    const saved = window.localStorage.getItem("locale");
    if (saved === "ru" || saved === "en") setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Пишем в localStorage только при явном переключении — без эффекта,
  // чтобы не перезаписать сохранённый выбор начальным значением при монтировании.
  const setLocale = (l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("locale", l);
  };

  const L = (s: Record<Locale, string>) => s[locale];

  return (
    <Ctx.Provider value={{ locale, setLocale, L }}>{children}</Ctx.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
