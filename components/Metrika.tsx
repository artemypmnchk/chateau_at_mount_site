"use client";

import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Яндекс.Метрика. Счётчик берётся из site.metrikaId; пока 0 — ничего не
 * грузится (безопасно). Навигация по сайту — обычными <a> (полные перезагрузки),
 * поэтому SPA-хиты слать не нужно: Метрика инициализируется на каждой странице.
 *
 * webvisor (запись сессий) включён. Содержимое полей формы (имя, телефон)
 * вебвизор по умолчанию не записывает — значения маскируются, если в настройках
 * счётчика не включена явная запись контента полей.
 */
export default function Metrika() {
  const id = site.metrikaId;
  if (!id) return null;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${id}", "ym");
        ym(${id}, "init", { ssr:true, webvisor:true, clickmap:true, accurateTrackBounce:true, trackLinks:true });`}
      </Script>
      {/* Пиксель для посетителей без JS. Разметка отдаётся строкой намеренно:
          React (float в Next 14) видит настоящий <img> даже внутри <noscript>
          и поднимает в <head> «<link rel=preload as=image>» на mc.yandex.ru.
          Тогда запрос к Яндексу уходит у всех при загрузке — при том что сам
          пиксель нужен лишь тем, у кого JS выключен, а остальным хит и так
          пришлёт tag.js. Строкой React содержимое не разбирает, preload не
          появляется, а поведение без JS остаётся прежним. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute;left:-9999px" alt="" /></div>`,
        }}
      />
    </>
  );
}
