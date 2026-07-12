"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { t } from "@/lib/content";
import { useLocale } from "./locale";
import BookingForm from "./BookingForm";

const BookingModalContext = createContext<{
  /** source — метка происхождения заявки (напр. «Опт · страница вин»),
   *  уходит в Telegram владельцу. Необязателен. */
  openBooking: (source?: string) => void;
} | null>(null);

/** Открывает поп-ап с формой заявки с любой страницы. */
export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }
  return ctx;
}

export function BookingModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { L } = useLocale();
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string | undefined>();
  // Гвард: onClick={openBooking} передаёт event — метку берём только строкой.
  const openBooking = useCallback((src?: string) => {
    setSource(typeof src === "string" ? src : undefined);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <BookingModalContext.Provider value={{ openBooking }}>
      {children}
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-label={L(t.contactsPage.formTitle)}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <h2>{L(t.contactsPage.formTitle)}</h2>
            <p className="form-note">{L(t.contactsPage.formNote)}</p>
            <BookingForm source={source} />
          </div>
        </div>
      )}
    </BookingModalContext.Provider>
  );
}
