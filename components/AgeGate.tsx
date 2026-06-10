"use client";

import { useEffect, useState } from "react";
import { t } from "@/lib/content";
import { useLocale } from "./locale";

const STORAGE_KEY = "age-verified";

/**
 * Возрастное подтверждение 18+ для алкогольного сайта.
 * Показывается один раз; выбор хранится в localStorage.
 * Рендерится только после монтирования — без расхождений SSR/клиент.
 */
export default function AgeGate() {
  const { L } = useLocale();
  const [show, setShow] = useState(false);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) !== "yes") setShow(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  const confirm = () => {
    window.localStorage.setItem(STORAGE_KEY, "yes");
    setShow(false);
  };

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-label="18+">
      <div className="age-gate-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo.png" alt="Chateau At Mount" />
        {denied ? (
          <p className="age-gate-denied">{L(t.ageGate.denied)}</p>
        ) : (
          <>
            <h2>{L(t.ageGate.title)}</h2>
            <p>{L(t.ageGate.text)}</p>
            <div className="age-gate-actions">
              <button className="btn btn-accent" onClick={confirm}>
                {L(t.ageGate.yes)}
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setDenied(true)}
              >
                {L(t.ageGate.no)}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
