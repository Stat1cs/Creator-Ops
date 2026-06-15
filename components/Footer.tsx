import Logo from "@/components/Logo";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Live demo", href: "#demo" },
      { label: "Channels", href: "#channels" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Program",
    links: [
      { label: "Founding program", href: "#founding" },
      { label: "Apply now", href: "/apply" },
      { label: "What you own", href: "#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "mailto:hello@creator-ops.site" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const SOCIALS: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.62c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.19.41-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.17.42-.36 1.04-.41 2.19-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.41 2.19.21.55.47.94.88 1.35.41.41.8.67 1.35.88.42.17 1.04.36 2.19.41 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.19-.41.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.17-.42.36-1.04.41-2.19.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.41-2.19a3.63 3.63 0 0 0-.88-1.35 3.63 3.63 0 0 0-1.35-.88c-.42-.17-1.04-.36-2.19-.41-1.24-.06-1.61-.07-4.76-.07zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6zm0 8.74a3.44 3.44 0 1 0 0-6.88 3.44 3.44 0 0 0 0 6.88zm6.74-8.94a1.24 1.24 0 1 1-2.48 0 1.24 1.24 0 0 1 2.48 0z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45C23.2 24 24 23.22 24 22.26V1.74C24 .78 23.2 0 22.22 0z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="px-3 sm:px-5 pb-4 sm:pb-5">
      <div className="footer-grid relative overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] border border-line bg-gradient-to-b from-card2 to-bg">
        <div
          aria-hidden="true"
          className="absolute -top-px left-1/2 -translate-x-1/2 w-[70rem] h-[28rem] max-w-full pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.14),transparent_62%)]"
        />

        {/* Oversized wordmark — footer background watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 flex items-end justify-center overflow-hidden"
        >
          <span className="font-display font-extrabold leading-[0.78] tracking-tighter text-ink/[0.05] text-[26vw] whitespace-nowrap select-none translate-y-[14%]">
            Creator Ops
          </span>
        </div>

        {/* Link columns */}
        <div className="relative z-10 px-6 sm:px-12 pt-14 sm:pt-16 pb-12 sm:pb-14 flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="md:max-w-sm">
            <div className="mb-4">
              <Logo wordmarkClassName="text-ink font-display font-semibold text-lg" />
            </div>
            <p className="text-mut text-sm leading-relaxed mb-6">
              Branded AI platforms for coaches and course creators. Trained on your
              content, your voice, your frameworks — deployed everywhere your students
              already are.
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-line bg-card flex items-center justify-center text-mut hover:text-ink hover:border-accent/40 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16 lg:gap-24">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="text-ink font-display font-semibold text-[0.95rem] mb-4">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-mut hover:text-ink transition-colors">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 px-6 sm:px-12 py-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[0.78rem] text-dim order-2 sm:order-1">
            © 2026 Creator Ops. Branded AI platforms for creators.
          </p>
          <span className="order-1 sm:order-2 inline-flex items-center gap-2 text-[0.78rem] text-mut">
            <span className="status-dot" aria-hidden="true" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
