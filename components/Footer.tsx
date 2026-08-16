"use client";

import { t, links } from "@/lib/content";
import { site } from "@/lib/site";
import { useLocale } from "./locale";

export default function Footer() {
  const { L, lp } = useLocale();
  return (
    // data-header-theme: над тёмным футером шапка-хамелеон растворяется,
    // а не лежит кремовой плашкой поверх тёмного (аудит 2026-07-11, F-13)
    <footer className="footer" data-header-theme="dark">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href={lp("/")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="" />
              <span className="brand-name" style={{ color: "#fff" }}>
                Chateau At Mount
              </span>
            </a>
            <p>{L(t.about.line1)}</p>
          </div>
          <div className="footer-col">
            <h4>{L(t.footer.brandCol)}</h4>
            {/* Раньше вёл на якорь #about главной — пункт меню ведёт на
                отдельную страницу, подвал должен вести туда же */}
            <a href={lp("/about")}>{L(t.nav.about)}</a>
            <a href={lp("/wines")}>{L(t.nav.wines)}</a>
            <a href={lp("/events")}>{L(t.nav.events)}</a>
          </div>
          <div className="footer-col">
            <h4>{L(t.footer.socialCol)}</h4>
            <a href={links.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={links.telegram} target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
            <a href={links.tiktok} target="_blank" rel="noopener noreferrer">
              TikTok
            </a>
          </div>
          <div className="footer-col">
            <h4>{L(t.footer.extraCol)}</h4>
            <a href={lp("/visit")}>{L(t.nav.visit)}</a>
            <a href={lp("/contacts")}>{L(t.nav.contacts)}</a>
          </div>
          <div className="footer-col">
            <h4>{L(t.footer.contactsCol)}</h4>
            <a href={site.contacts.phoneHref}>{site.contacts.phone}</a>
            <a href={`mailto:${site.contacts.email}`}>{site.contacts.email}</a>
            <p className="footer-address">{L(site.contacts.addressLine)}</p>
            <a
              href={site.contacts.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {L(t.contactsPage.showOnMap)} →
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} {L(t.footer.rights)}
        </div>
      </div>
    </footer>
  );
}
