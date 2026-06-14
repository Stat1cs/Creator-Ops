import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Apply — Creator Ops Founding Program",
  description:
    "Apply for one of three founding creator spots. $0 setup, revenue-share only — we build and operate your branded AI platform.",
};

export default function ApplyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="min-h-svh pt-28 sm:pt-32 pb-20 px-5 sm:px-8">
        <div className="shell-narrow max-w-2xl mx-auto">
          <Link
            href="/#founding"
            className="inline-flex items-center gap-1.5 text-sm text-mut hover:text-ink transition-colors mb-8"
          >
            ← Back to founding program
          </Link>

          <div className="ring-card relative p-[clamp(2rem,5vw,3rem)] overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(249,115,22,0.12),transparent_70%)]"
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-xs font-display font-semibold text-accent">
                <span className="pulse-dot" aria-hidden="true" />
                3 founding spots open
              </div>

              <h1 className="display-lg mb-4">
                Apply for a{" "}
                <span className="font-serif-i text-gradient">founding spot.</span>
              </h1>

              <p className="lede mb-8">
                Tell us about your content, audience, and what you&apos;d build.
                We review every application and respond within 24 hours.
              </p>

              <LeadForm type="founding" intake="full" />

              <p className="mt-6 text-[0.78rem] text-mut">
                Not ready for a full application?{" "}
                <Link href="/#founding" className="text-accent hover:underline">
                  Leave your email on the homepage
                </Link>{" "}
                or write to{" "}
                <a href="mailto:hello@creator-ops.site" className="text-accent hover:underline">
                  hello@creator-ops.site
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
