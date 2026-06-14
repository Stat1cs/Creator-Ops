import type { LeadPayload } from "@/lib/leads";

const BRAND = {
  bg: "#0a0807",
  card: "#15110d",
  cardInner: "#1c1812",
  ink: "#f8f4ec",
  mut: "#a89e8e",
  dim: "#5a5145",
  accent: "#f97316",
  amber: "#fbbf24",
  ember: "#ea580c",
  line: "#2a241d",
} as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function firstName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "";
  return trimmed.split(/\s+/)[0] ?? trimmed;
}

function paragraph(text: string): string {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${BRAND.mut};">${text}</p>`;
}

function ctaButton(label: string, href: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 8px;">
      <tr>
        <td bgcolor="${BRAND.accent}" style="border-radius:999px;background-color:${BRAND.accent};">
          <a href="${href}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#1a0d02;text-decoration:none;border-radius:999px;background-color:${BRAND.accent};">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>
  `.trim();
}

function textLink(label: string, href: string): string {
  return `<a href="${href}" target="_blank" style="color:${BRAND.accent};text-decoration:none;font-weight:600;">${escapeHtml(label)}</a>`;
}

type EmailLayoutOptions = {
  siteUrl: string;
  preheader: string;
  badge: string;
  headline: string;
  headlineAccent?: string;
  bodyHtml: string;
  cta?: { label: string; href: string };
  footnote?: string;
};

function emailLayout({
  siteUrl,
  preheader,
  badge,
  headline,
  headlineAccent,
  bodyHtml,
  cta,
  footnote,
}: EmailLayoutOptions): string {
  const headlineHtml = headlineAccent
    ? `${escapeHtml(headline)} <span style="font-family:Georgia,'Times New Roman',serif;font-style:italic;color:${BRAND.accent};">${escapeHtml(headlineAccent)}</span>`
    : escapeHtml(headline);

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="dark only" />
  <meta name="supported-color-schemes" content="dark only" />
  <title>Creator Ops</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    :root { color-scheme: dark only; supported-color-schemes: dark only; }
    html, body { margin: 0 !important; padding: 0 !important; height: 100% !important; width: 100% !important; }
    body, table, td, p, a, h1 { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; }
    img { border: 0; outline: none; text-decoration: none; }
    .email-bg { background-color: ${BRAND.bg} !important; }
    .email-card { background-color: ${BRAND.card} !important; }
    @media (prefers-color-scheme: dark) {
      .email-bg { background-color: ${BRAND.bg} !important; }
      .email-card { background-color: ${BRAND.card} !important; }
      .email-ink { color: ${BRAND.ink} !important; }
      .email-mut { color: ${BRAND.mut} !important; }
      .email-dim { color: ${BRAND.dim} !important; }
    }
    u + .body .email-bg { background-color: ${BRAND.bg} !important; }
    u + .body .email-card { background-color: ${BRAND.card} !important; }
  </style>
</head>
<body class="body email-bg" bgcolor="${BRAND.bg}" style="margin:0;padding:0;width:100%;height:100%;background-color:${BRAND.bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${BRAND.bg};">${escapeHtml(preheader)}&#847;&zwnj;&nbsp;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.bg}" class="email-bg" style="width:100%;background-color:${BRAND.bg};">
    <tr>
      <td align="center" bgcolor="${BRAND.bg}" class="email-bg" style="background-color:${BRAND.bg};padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.bg}" class="email-bg" style="max-width:560px;background-color:${BRAND.bg};">
          <tr>
            <td bgcolor="${BRAND.bg}" class="email-bg" style="padding:0 0 24px;background-color:${BRAND.bg};" align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.bg}" style="background-color:${BRAND.bg};">
                <tr>
                  <td bgcolor="${BRAND.bg}" style="padding-right:10px;vertical-align:middle;background-color:${BRAND.bg};">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="36" height="36" bgcolor="${BRAND.accent}" align="center" valign="middle" style="width:36px;height:36px;border-radius:10px;background-color:${BRAND.accent};font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:800;color:#1a0d02;">
                          CO
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td bgcolor="${BRAND.bg}" class="email-ink" style="vertical-align:middle;background-color:${BRAND.bg};font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;color:${BRAND.ink};letter-spacing:-0.02em;">
                    Creator Ops
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="${BRAND.card}" class="email-card" style="border-radius:20px;border:1px solid ${BRAND.line};background-color:${BRAND.card};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.card}" class="email-card" style="background-color:${BRAND.card};">
                <tr>
                  <td bgcolor="${BRAND.ember}" height="4" style="height:4px;line-height:4px;font-size:4px;background-color:${BRAND.ember};">&nbsp;</td>
                </tr>
                <tr>
                  <td bgcolor="${BRAND.card}" class="email-card" style="padding:32px 28px 12px;background-color:${BRAND.card};">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                      <tr>
                        <td bgcolor="${BRAND.cardInner}" style="padding:6px 14px;border-radius:999px;border:1px solid ${BRAND.accent};background-color:${BRAND.cardInner};font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${BRAND.accent};">
                          ${escapeHtml(badge)}
                        </td>
                      </tr>
                    </table>
                    <h1 class="email-ink" style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:1.15;font-weight:800;letter-spacing:-0.03em;color:${BRAND.ink};">
                      ${headlineHtml}
                    </h1>
                    ${bodyHtml}
                    ${cta ? ctaButton(cta.label, cta.href) : ""}
                    ${footnote ? paragraph(footnote) : ""}
                  </td>
                </tr>
                <tr>
                  <td bgcolor="${BRAND.card}" class="email-card" style="padding:8px 28px 28px;background-color:${BRAND.card};">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.card}" style="border-top:1px solid ${BRAND.line};background-color:${BRAND.card};">
                      <tr>
                        <td bgcolor="${BRAND.card}" class="email-dim" style="padding-top:20px;background-color:${BRAND.card};font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${BRAND.dim};">
                          Questions? Reply to this email — we read every message.<br />
                          <a href="${siteUrl}" target="_blank" style="color:${BRAND.accent};text-decoration:none;">${siteUrl.replace(/^https?:\/\//, "")}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="${BRAND.bg}" class="email-dim email-bg" align="center" style="padding:24px 8px 0;background-color:${BRAND.bg};font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;color:${BRAND.dim};">
              © ${new Date().getFullYear()} Creator Ops · Branded AI platforms for creators
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export type ApplicantEmail = {
  subject: string;
  text: string;
  html: string;
};

export function buildApplicantAutoReplyEmail(
  data: LeadPayload,
  siteUrl: string
): ApplicantEmail {
  if (data.type === "founding" && data.intake === "email") {
    const applyUrl = `${siteUrl}/apply`;
    return {
      subject: "You're on the list — Creator Ops",
      text: [
        "Thanks for registering interest in the Founding Creator Program.",
        "",
        "We're accepting 3 founding creators with $0 setup and revenue-share only. We'll email you with program updates as spots open up.",
        "",
        "Ready to move faster? Complete your application here:",
        applyUrl,
        "",
        "Questions? Just reply to this email.",
        "",
        "— Creator Ops",
        siteUrl,
      ].join("\n"),
      html: emailLayout({
        siteUrl,
        preheader: "You're registered for founding program updates.",
        badge: "Founding program",
        headline: "You're on the",
        headlineAccent: "list.",
        bodyHtml: [
          paragraph(
            "Thanks for registering interest in the Founding Creator Program."
          ),
          paragraph(
            "We're accepting <strong style=\"color:#f8f4ec;\">3 founding creators</strong> with $0 setup and revenue-share only. We'll email you with program updates as spots open up."
          ),
          paragraph(
            `Ready to move faster? ${textLink("Complete your full application", applyUrl)}.`
          ),
        ].join(""),
        cta: { label: "Complete application →", href: applyUrl },
      }),
    };
  }

  if (data.type === "founding" && data.intake === "full") {
    const name = firstName(data.name);
    const greeting = name ? `Hi ${name},` : "Hi,";
    const demoUrl = `${siteUrl}/#demo`;

    return {
      subject: "We received your application — Creator Ops",
      text: [
        greeting,
        "",
        "Thanks for applying to the Founding Creator Program. We review every application personally and aim to respond within 24 hours.",
        "",
        "While you wait, you can explore our live AI demo:",
        demoUrl,
        "",
        "Questions? Just reply to this email.",
        "",
        "— Creator Ops",
        siteUrl,
      ].join("\n"),
      html: emailLayout({
        siteUrl,
        preheader: "Your founding creator application is in our queue.",
        badge: "Application received",
        headline: "We got your",
        headlineAccent: "application.",
        bodyHtml: [
          paragraph(
            `${escapeHtml(greeting)} Thanks for applying to the Founding Creator Program.`
          ),
          paragraph(
            "We review every application personally and aim to respond within <strong style=\"color:#f8f4ec;\">24 hours</strong>."
          ),
          paragraph(
            `While you wait, explore our live AI demo — ${textLink("see Coach Jordan in action", demoUrl)}.`
          ),
        ].join(""),
        cta: { label: "Try the live demo →", href: demoUrl },
        footnote: "We'll follow up with next steps if your profile is a fit for one of the 3 founding spots.",
      }),
    };
  }

  const name = firstName(data.name);
  const greeting = name ? `Hi ${name},` : "Hi,";

  return {
    subject: "We received your message — Creator Ops",
    text: [
      greeting,
      "",
      "Thanks for reaching out to Creator Ops. We've received your inquiry and will get back to you within 24 hours.",
      "",
      "Questions? Just reply to this email.",
      "",
      "— Creator Ops",
      siteUrl,
    ].join("\n"),
    html: emailLayout({
      siteUrl,
      preheader: "Thanks for reaching out to Creator Ops.",
      badge: "Message received",
      headline: "We received your",
      headlineAccent: "message.",
      bodyHtml: [
        paragraph(`${escapeHtml(greeting)} Thanks for reaching out to Creator Ops.`),
        paragraph(
          "We've received your inquiry and will get back to you within <strong style=\"color:#f8f4ec;\">24 hours</strong>."
        ),
      ].join(""),
      cta: { label: "Visit Creator Ops →", href: siteUrl },
    }),
  };
}
