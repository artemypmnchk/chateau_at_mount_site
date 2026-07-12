"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { locales, type Locale } from "@/lib/content";

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Хелпер: достаёт значение нужного языка из словаря { ru, en, ro }.
   *  Дженерик — работает и со строкой, и с массивом (напр. вкусовые ноты). */
  L: <T,>(s: Record<Locale, T>) => T;
}

const Ctx = createContext<LocaleCtx | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");

  // Восстанавливаем выбор языка из localStorage на клиенте (один раз при монтировании).
  useEffect(() => {
    const saved = window.localStorage.getItem("locale");
    if (locales.includes(saved as Locale)) setLocaleState(saved as Locale);
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

  const L = <T,>(s: Record<Locale, T>) => s[locale];

  return (
    <Ctx.Provider value={{ locale, setLocale, L }}>{children}</Ctx.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
