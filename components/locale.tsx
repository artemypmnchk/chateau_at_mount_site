"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/content";
import { localizePath, stripLocale } from "@/lib/i18n";

interface LocaleCtx {
  locale: Locale;
  /** Хелпер: достаёт значение нужного языка из словаря { ru, en, ro }.
   *  Дженерик — работает и со строкой, и с массивом (напр. вкусовые ноты). */
  L: <T,>(s: Record<Locale, T>) => T;
  /** Локализует внутренний путь под текущий язык: ru → как есть, en/ro →
   *  с префиксом. Оборачивать им href всех внутренних ссылок. */
  lp: (path: string) => string;
}

const Ctx = createContext<LocaleCtx | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Локаль детерминирована первым сегментом URL (/en, /ro, иначе ru). Так
  // серверный HTML сразу рендерится на нужном языке — поисковик видит три
  // отдельных адреса, а не одну русскую страницу с клиентским переключением.
  const pathname = usePathname();
  const locale = stripLocale(pathname).locale;

  // Правим <html lang> на клиенте (корневой layout статичен и не знает
  // вложенную локаль — начальный ru корректируется после гидрации).
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const L = <T,>(s: Record<Locale, T>) => s[locale];
  const lp = (path: string) => localizePath(locale, path);

  return <Ctx.Provider value={{ locale, L, lp }}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
