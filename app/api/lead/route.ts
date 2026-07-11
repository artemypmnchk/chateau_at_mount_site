import { NextResponse } from "next/server";

/**
 * Приём заявки с формы: шлём сообщение в Telegram владельца через бота.
 *
 * Нужны переменные окружения (см. .env.example):
 *   TELEGRAM_BOT_TOKEN — токен бота из @BotFather
 *   TELEGRAM_CHAT_ID   — id чата/группы, куда слать заявки
 *
 * Клиент показывает «успех» только после 200 отсюда — раньше форма
 * открывала mailto и рапортовала об успехе, даже если письмо никуда
 * не ушло (см. аудит 2026-07-11, F-01).
 */

// База API вынесена в env только ради тестов (мок вместо api.telegram.org)
const API_BASE = process.env.TELEGRAM_API_BASE ?? "https://api.telegram.org";

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const field = (k: string, max: number) =>
    typeof data[k] === "string" ? (data[k] as string).trim().slice(0, max) : "";
  const name = field("name", 200);
  const contact = field("contact", 200);
  const topic = field("topic", 500);

  // Honeypot: скрытое поле «company» люди не видят и не заполняют.
  // Ботам отвечаем «успехом», чтобы не выдавать ловушку.
  if (field("company", 10)) return NextResponse.json({ ok: true });

  if (!name || !contact) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const text = [
    "🍷 Заявка с сайта",
    `Имя: ${name}`,
    `Контакт: ${contact}`,
    topic && `Вопрос: ${topic}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(`${API_BASE}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
