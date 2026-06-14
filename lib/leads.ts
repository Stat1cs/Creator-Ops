import { buildApplicantAutoReplyEmail } from "@/lib/email-templates";

export type LeadType = "founding" | "inquiry";
export type LeadIntake = "full" | "email";

export type LeadPayload = {
  name: string;
  email: string;
  audienceSize: string;
  message: string;
  type: LeadType;
  intake: LeadIntake;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://creator-ops.site";

export function validateLead(body: unknown): { ok: true; data: LeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const record = body as Record<string, unknown>;
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const type = record.type;
  const intake = record.intake === "email" ? "email" : "full";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email." };
  }
  if (type !== "founding" && type !== "inquiry") {
    return { ok: false, error: "Invalid submission type." };
  }

  if (intake === "email") {
    return {
      ok: true,
      data: {
        name: "",
        email,
        audienceSize: "",
        message: "",
        type,
        intake,
      },
    };
  }

  const name = typeof record.name === "string" ? record.name.trim() : "";
  const audienceSize =
    typeof record.audienceSize === "string" ? record.audienceSize.trim() : "";
  const message = typeof record.message === "string" ? record.message.trim() : "";

  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (audienceSize.length < 1) {
    return { ok: false, error: "Please select your audience size." };
  }
  if (message.length < 10) {
    return { ok: false, error: "Tell us a bit more about what you would build." };
  }

  return {
    ok: true,
    data: { name, email, audienceSize, message, type, intake: "full" },
  };
}

function leadConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    to: process.env.LEAD_EMAIL ?? "hello@creator-ops.site",
    from: process.env.LEAD_FROM ?? "Creator Ops <hello@creator-ops.site>",
    replyTo: process.env.LEAD_REPLY_TO ?? process.env.LEAD_EMAIL ?? "hello@creator-ops.site",
  };
}

function buildInternalLeadEmail(data: LeadPayload): { subject: string; text: string } {
  const subject =
    data.intake === "email"
      ? data.type === "founding"
        ? `Founding Creator Interest — ${data.email}`
        : `Creator Ops Interest — ${data.email}`
      : data.type === "founding"
        ? `Founding Creator Application — ${data.name}`
        : `Creator Ops Inquiry — ${data.name}`;

  const text =
    data.intake === "email"
      ? [
          `Type: ${data.type}`,
          `Intake: email signup (landing page)`,
          `Email: ${data.email}`,
        ].join("\n")
      : [
          `Type: ${data.type}`,
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Audience: ${data.audienceSize}`,
          "",
          data.message,
        ].join("\n");

  return { subject, text };
}

async function sendResendEmail(
  apiKey: string,
  payload: {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
    replyTo?: string;
  }
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      reply_to: payload.replyTo,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend send failed: ${detail}`);
  }
}

async function sendApplicantAutoReply(
  apiKey: string,
  from: string,
  replyTo: string,
  data: LeadPayload
): Promise<void> {
  const { subject, text, html } = buildApplicantAutoReplyEmail(data, SITE_URL);

  await sendResendEmail(apiKey, {
    from,
    to: data.email,
    subject,
    text,
    html,
    replyTo,
  });
}

export async function deliverLead(data: LeadPayload): Promise<void> {
  const { apiKey, to, from, replyTo } = leadConfig();
  const internal = buildInternalLeadEmail(data);

  if (!apiKey) {
    console.info("[lead]", { subject: internal.subject, ...data });
    console.info("[lead:auto-reply]", buildApplicantAutoReplyEmail(data, SITE_URL).subject);
    return;
  }

  await sendResendEmail(apiKey, {
    from,
    to,
    subject: internal.subject,
    text: internal.text,
    replyTo: data.email,
  });

  try {
    await sendApplicantAutoReply(apiKey, from, replyTo, data);
  } catch (error) {
    console.error("[lead:auto-reply]", error instanceof Error ? error.message : error);
  }
}
