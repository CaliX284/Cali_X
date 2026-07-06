import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("PROJECT_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY")!
);

const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!;
const CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID")!;

async function getMemberName(memberId: string | null) {
  if (!memberId) return null;

  const { data } = await supabase
    .from("members")
    .select("full_name")
    .eq("id", memberId)
    .single();

  return data?.full_name ?? null;
}

async function getCaptainName(captainId: string | null) {
  if (!captainId) return null;

  const { data } = await supabase
    .from("captains")
    .select("full_name")
    .eq("id", captainId)
    .single();

  return data?.full_name ?? null;
}

function getTitle(type: string, direction: string) {
  switch (type) {
    case "new_member":
      return "🆕 عضو جديد";

    case "renewal":
      return "🔄 تجديد اشتراك";

    case "debt_payment":
      return "💵 سداد مستحقات";

    case "session":
      return "🏋️ حصة";

    case "salary":
      return "💸 صرف مرتب";

    case "expense":
      return "🔴 مصروف";

    case "product":
      return "🛒 بيع منتج";

    case "manual":
      return direction === "expense"
        ? "🔴 مصروف يدوي"
        : "🟢 إيراد يدوي";

    default:
      return direction === "expense"
        ? "🔴 مصروف"
        : "🟢 إيراد";
  }
}

async function buildMessage(record: any) {
  const memberName = await getMemberName(record.member_id);
  const captainName = await getCaptainName(record.captain_id);

  let text = `${getTitle(
    record.type_transaction,
    record.direction
  )}\n\n`;

  if (memberName) {
    text += `👤 العضو: ${memberName}\n`;
  }

  if (captainName) {
    text += `👨‍🏫 الكابتن: ${captainName}\n`;
  }

  text += `💰 المبلغ: ${record.amount_paid ?? 0} جنيه\n`;

  if (record.notes && String(record.notes).trim()) {
    text += `📝 الملاحظات:\n${record.notes}\n`;
  }

  if (record.paid_at) {
    const date = new Date(record.paid_at);

    text += `🕒 ${date.toLocaleString("ar-EG", {
      dateStyle: "medium",
      timeStyle: "short",
    })}\n`;
  }

  text += `\n━━━━━━━━━━━━━━`;
  text += `\n🏋️ Cali X Management`;

  return text;
}

async function sendTelegram(text: string) {
  return await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
      }),
    }
  );
}
import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("PROJECT_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY")!
);

const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!;
const CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID")!;

async function getMemberName(memberId: string | null) {
  if (!memberId) return null;

  const { data } = await supabase
    .from("members")
    .select("full_name")
    .eq("id", memberId)
    .single();

  return data?.full_name ?? null;
}

async function getCaptainName(captainId: string | null) {
  if (!captainId) return null;

  const { data } = await supabase
    .from("captains")
    .select("full_name")
    .eq("id", captainId)
    .single();

  return data?.full_name ?? null;
}

function getTitle(type: string, direction: string) {
  switch (type) {
    case "new_member":
      return "🆕 عضو جديد";

    case "renewal":
      return "🔄 تجديد اشتراك";

    case "debt_payment":
      return "💵 سداد مستحقات";

    case "session":
      return "🏋️ حصة";

    case "salary":
      return "💸 صرف مرتب";

    case "expense":
      return "🔴 مصروف";

    case "product":
      return "🛒 بيع منتج";

    case "manual":
      return direction === "expense"
        ? "🔴 مصروف يدوي"
        : "🟢 إيراد يدوي";

    default:
      return direction === "expense"
        ? "🔴 مصروف"
        : "🟢 إيراد";
  }
}

async function buildMessage(record: any) {
  const memberName = await getMemberName(record.member_id);
  const captainName = await getCaptainName(record.captain_id);

  let text = `${getTitle(
    record.type_transaction,
    record.direction
  )}\n\n`;

  if (memberName) {
    text += `👤 العضو: ${memberName}\n`;
  }

  if (captainName) {
    text += `👨‍🏫 الكابتن: ${captainName}\n`;
  }

  text += `💰 المبلغ: ${record.amount_paid ?? 0} جنيه\n`;

  if (record.notes && String(record.notes).trim()) {
    text += `📝 الملاحظات:\n${record.notes}\n`;
  }

  if (record.paid_at) {
    const date = new Date(record.paid_at);

    text += `🕒 ${date.toLocaleString("ar-EG", {
      dateStyle: "medium",
      timeStyle: "short",
    })}\n`;
  }

  text += `\n━━━━━━━━━━━━━━`;
  text += `\n🏋️ Cali X Management`;

  return text;
}

async function sendTelegram(text: string) {
  return await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
      }),
    }
  );
}