"use client";

import { useEffect, useRef } from "react";
import { applyScrollReveals } from "@/lib/scroll-reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import LeadForm from "@/components/LeadForm";

const TERMS = [
  { label: "$0 setup", detail: "No upfront fee, no retainers, no monthly charges." },
  { label: "Revenue-share only", detail: "We earn a slice of subscription revenue. We only win when you win." },
  { label: "Full build + ops", detail: "We build, launch, and operate your entire AI platform — tech included." },
  { label: "Case study rights", detail: "In return: launch to your audience within 30 days and let us tell the story." },
];

export default function Founding() {
  const sec = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const scope = sec.current;
    if (!scope) return;
    return applyScrollReveals(
      scope,
      [
        {
          selector: ".reveal-in",
          from: { y: 36, opacity: 0 },
          to: { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 },
          start: "top 85%",
        },
      ],
      reducedMotion
    );
  }, [reducedMotion]);

  return (
    <section id="founding" ref={sec} className="section overflow-hidden">
      <div className="shell-narrow">
        <div className="reveal-in ring-card relative p-[clamp(2rem,5vw,4.5rem)] overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(249,115,22,0.12),transparent_70%)]"
          />

          <div className="relative">
            <div className="reveal-in inline-flex items-center gap-2.5 mb-7 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-xs font-display font-semibold text-accent">
              <span className="pulse-dot" aria-hidden="true" />
              3 founding spots open
            </div>

            <h2 className="reveal-in display-lg mb-5">
              The Founding{" "}
              <span className="font-serif-i text-gradient">Creator Program.</span>
            </h2>

            <p className="reveal-in lede max-w-xl mb-10">
              We&apos;re building our first public case studies. The three creators
              we partner with get terms we&apos;ll never offer again.
            </p>

            <div className="reveal-in grid gap-3.5 sm:grid-cols-2 mb-10">
              {TERMS.map((t, i) => (
                <div key={i} className="flex gap-3 rounded-xl border border-line bg-bg2 px-5 py-4">
                  <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">✦</span>
                  <div>
                    <p className="font-display font-semibold text-ink text-[0.9rem] mb-1">
                      {t.label}
                    </p>
                    <p className="text-mut text-[0.8rem] leading-relaxed">{t.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal-in w-full max-w-lg mx-auto md:text-center">
              <LeadForm type="founding" intake="email" />
              <p className="mt-4 text-[0.78rem] text-mut">
                Ready to apply?{" "}
                <a href="/apply" className="text-accent hover:underline">
                  Complete the full application →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
