"use client";

import { useState } from "react";
import { t, links } from "@/lib/content";
import { site } from "@/lib/site";
import { useLocale } from "./locale";

/**
 * Форма заявки: используется на странице контактов
 * и в поп-апе бронирования на остальных страницах.
 */
export default function BookingForm() {
  const { L } = useLocale();
  const c = t.contactsPage;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    topic: "",
    contact: "",
    phone: "",
  });

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Заявка с сайта Chateau At Mount");
    const body = encodeURIComponent(
      [
        `Имя: ${form.name}`,
        `Вопрос: ${form.topic}`,
        `Telegram / почта: ${form.contact}`,
        `Телефон: ${form.phone}`,
      ].join("\n")
    );
    window.location.href = `mailto:${site.contacts.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return <div className="form-success">{L(c.success)}</div>;
  }

  return (
    <form onSubmit={onSubmit} className="contact-form">
      <input
        type="text"
        placeholder={L(c.fields.name)}
        value={form.name}
        onChange={set("name")}
        required
      />
      <input
        type="text"
        placeholder={L(c.fields.topic)}
        value={form.topic}
        onChange={set("topic")}
      />
      <input
        type="text"
        placeholder={L(c.fields.contact)}
        value={form.contact}
        onChange={set("contact")}
        required
      />
      <input
        type="tel"
        placeholder={L(c.fields.phone)}
        value={form.phone}
        onChange={set("phone")}
      />
      <button type="submit" className="btn btn-accent">
        {L(c.submit)}
      </button>
      <a
        className="tg-link"
        href={links.telegram}
        target="_blank"
        rel="noopener noreferrer"
      >
        {L(c.orTelegram)}
      </a>
    </form>
  );
}
