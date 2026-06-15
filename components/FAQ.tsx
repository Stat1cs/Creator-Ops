"use client";

import { useEffect, useRef } from "react";
import { applyScrollReveals } from "@/lib/scroll-reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const FAQS = [
  {
    q: "Do I own the AI and the content it's trained on?",
    a: "Completely. Your platform, your brand, your data, your audience. We build and operate it, but everything is yours — including the trained knowledge base. If we ever parted ways, you keep it all.",
  },
  {
    q: "How long until I'm live?",
    a: "Under 30 days from kickoff. The first 2–3 days are an onboarding call and content audit, then 5–10 days of building and training, followed by deployment across your chosen channels.",
  },
  {
    q: "How does the revenue share work for founding creators?",
    a: "Founding creators pay $0 setup and no monthly fee. Instead, we take an agreed percentage of the subscription revenue your platform generates. We only make money when you do — so we're motivated to make it convert.",
  },
  {
    q: "Will it actually sound like me?",
    a: "Yes. We train it exclusively on your material — courses, calls, docs, posts — and map how you teach, not just what you know. It mirrors your frameworks, tone, and point of view, not a generic model.",
  },
  {
    q: "What if my content changes over time?",
    a: "Plans include knowledge syncs (monthly or quarterly depending on tier) so your AI stays current as you publish new material, update offers, or refine your frameworks.",
  },
  {
    q: "Which channels can it deploy to?",
    a: "An embed on your own site, Discord, WhatsApp, Slack, Telegram, and a clean direct link. We handle deployment and maintenance across all of them — you never touch the tech.",
  },
];

export default function FAQ() {
  const sec = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const scope = sec.current;
    if (!scope) return;
    return applyScrollReveals(
      scope,
      [
        {
          selector: ".reveal-title",
          from: { y: 30 },
          to: { y: 0, duration: 0.7, ease: "power2.out" },
        },
        {
          selector: ".reveal-head",
          from: { y: 28, opacity: 0 },
          to: { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1 },
        },
        {
          selector: ".reveal-item",
          from: { y: 24, opacity: 0 },
          to: { y: 0, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.08 },
        },
      ],
      reducedMotion
    );
  }, [reducedMotion]);

  return (
    <section id="faq" ref={sec} className="section border-t border-line">
      <div className="shell-narrow">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="reveal-head eyebrow justify-center mb-5">
            <span className="text-ember">06</span> Questions
          </p>
          <h2 className="reveal-title display-lg">
            The things creators{" "}
            <span className="font-serif-i text-gradient">actually ask.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <details key={i} className="faq-item reveal-item" name="faq">
              <summary>
                {f.q}
                <svg className="faq-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <div className="faq-body">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
