"use client";

import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Яндекс.Метрика. Счётчик берётся из site.metrikaId; пока 0 — ничего не
 * грузится (безопасно). Навигация по сайту — обычными <a> (полные перезагрузки),
 * поэтому SPA-хиты слать не нужно: Метрика инициализируется на каждой странице.
 *
 * webvisor (запись сессий) намеренно выключен: на сайте форма заявки с именем
 * и телефоном — запись таких полей чувствительна. Включать осознанно.
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
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(${id}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:false });`}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${id}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
