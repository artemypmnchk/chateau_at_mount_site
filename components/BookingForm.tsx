"use client";

import { useId, useState } from "react";
import { t, links } from "@/lib/content";
import { site } from "@/lib/site";
import { useLocale } from "./locale";

/**
 * Форма заявки: используется на странице контактов
 * и в поп-апе бронирования на остальных страницах.
 *
 * Отправка — POST /api/lead (Telegram-бот владельца); «успех» показываем
 * только после ответа 200. При ошибке — Telegram и письмо как запасные
 * пути, без ложного «заявка отправлена».
 */
export default function BookingForm() {
  const { L } = useLocale();
  const c = t.contactsPage;
  const id = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [form, setForm] = useState({
    name: "",
    contact: "",
    topic: "",
    company: "", // honeypot — люди поле не видят
  });

  const set =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return <div className="form-success">{L(c.success)}</div>;
  }

  // Запасной путь при ошибке — письмо с уже заполненной заявкой
  const mailtoHref = `mailto:${site.contacts.email}?subject=${encodeURIComponent(
    "Заявка с сайта Chateau At Mount"
  )}&body=${encodeURIComponent(
    [
      `Имя: ${form.name}`,
      `Контакт: ${form.contact}`,
      form.topic && `Вопрос: ${form.topic}`,
    ]
      .filter(Boolean)
      .join("\n")
  )}`;

  return (
    <form onSubmit={onSubmit} className="contact-form">
      <div className="field">
        <label className="field-label" htmlFor={`${id}-name`}>
          {L(c.fields.name)}
        </label>
        <input
          id={`${id}-name`}
          type="text"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={set("name")}
          required
        />
      </div>
      <div className="field">
        <label className="field-label" htmlFor={`${id}-contact`}>
          {L(c.fields.contact)}
        </label>
        <input
          id={`${id}-contact`}
          type="text"
          name="phone"
          autoComplete="tel"
          placeholder={L(c.fields.contactHint)}
          value={form.contact}
          onChange={set("contact")}
          required
        />
      </div>
      <div className="field">
        <label className="field-label" htmlFor={`${id}-topic`}>
          {L(c.fields.topic)}
          <span className="field-optional"> · {L(c.fields.optional)}</span>
        </label>
        <input
          id={`${id}-topic`}
          type="text"
          name="topic"
          placeholder={L(c.fields.topicHint)}
          value={form.topic}
          onChange={set("topic")}
        />
      </div>
      {/* Honeypot против ботов: спрятано и от глаз, и от таба */}
      <input
        type="text"
        name="company"
        className="hp-field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.company}
        onChange={set("company")}
      />
      {status === "error" && (
        <p className="form-error" role="alert">
          {L(c.error)}{" "}
          <a href={mailtoHref} className="form-error-mail">
            {L(c.errorMail)} →
          </a>
        </p>
      )}
      <button
        type="submit"
        className="btn btn-accent"
        disabled={status === "sending"}
      >
        {status === "sending" ? L(c.sending) : L(c.submit)}
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
