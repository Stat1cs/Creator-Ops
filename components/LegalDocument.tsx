import Link from "next/link";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type LegalDocumentProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function LegalDocument({ title, description, children }: LegalDocumentProps) {
  return (
    <>
      <Nav />
      <main id="main" className="min-h-svh pt-28 sm:pt-32 pb-20 px-5 sm:px-8">
        <div className="shell-narrow max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-mut hover:text-ink transition-colors mb-8"
          >
            ← Back to home
          </Link>

          <div className="ring-card relative p-[clamp(2rem,5vw,3rem)] overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(249,115,22,0.08),transparent_70%)]"
            />

            <div className="relative">
              <p className="eyebrow mb-4">Legal</p>
              <h1 className="display-lg mb-3">{title}</h1>
              <p className="lede mb-2">{description}</p>
              <p className="text-sm text-dim mb-10">Last updated: June 15, 2026</p>

              <div className="legal-prose">{children}</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10 last:mb-0">
      <h2 className="font-display font-semibold text-xl text-ink mb-3 tracking-tight">
        {title}
      </h2>
      <div className="space-y-3 text-mut text-[0.92rem] leading-relaxed">{children}</div>
    </section>
  );
}
