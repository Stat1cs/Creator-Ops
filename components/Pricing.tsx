"use client";

import { useEffect, useRef } from "react";
import { applyScrollReveals } from "@/lib/scroll-reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const PLANS = [
  {
    name: "Starter",
    setup: "$1,500",
    mo: "$149/mo",
    desc: "One branded AI assistant trained on your content. Perfect for solo coaches building a first AI touchpoint.",
    features: ["1 AI assistant, trained on you", "Branded to your voice + name", "Embed + direct link deployment", "Monthly knowledge sync", "30-day setup"],
    hot: false,
  },
  {
    name: "Pro",
    setup: "$3,000",
    mo: "$249/mo",
    desc: "Multiple tools, your own subscription portal, Stripe integration. For creators ready to monetize access directly.",
    features: ["Everything in Starter", "2 interactive AI tools", "Custom domain studio", "Your own Stripe for subscriptions", "Discord + WhatsApp deployment", "Quarterly content sync"],
    hot: true,
  },
  {
    name: "Flagship",
    setup: "$5,000",
    mo: "$399/mo",
    desc: "Full ecosystem — 4 tools, launch copy, ongoing optimization. For established creators with 50K+ audiences.",
    features: ["Everything in Pro", "4 AI tools", "All 6 channel deployments", "Quarterly optimization calls", "Launch copy kit", "Priority support"],
    hot: false,
  },
];

export default function Pricing() {
  const sec = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const scope = sec.current;
    if (!scope) return;
    return applyScrollReveals(
      scope,
      [
        {
          selector: ".reveal-head",
          from: { y: 28, opacity: 0 },
          to: { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1 },
        },
        {
          selector: ".reveal-card",
          from: { y: 46, opacity: 0 },
          to: { y: 0, opacity: 1, duration: 0.65, ease: "power2.out", stagger: 0.1 },
        },
      ],
      reducedMotion
    );
  }, [reducedMotion]);

  return (
    <section id="pricing" ref={sec} className="section border-t border-line">
      <div className="shell">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="reveal-head eyebrow justify-center mb-5">
            <span className="text-ember">05</span> Pricing
          </p>
          <h2 className="reveal-head display-lg mb-4">
            Standard rates{" "}
            <span className="font-serif-i text-mut">after founding.</span>
          </h2>
          <p className="reveal-head lede mb-5">
            All plans include full build, training, and ongoing operations.
          </p>
          <a
            href="#founding"
            className="reveal-head inline-flex items-center gap-2 text-accent text-sm font-display font-medium"
          >
            <span className="pulse-dot" aria-hidden="true" />
            Want $0 setup? See the Founding Program ↑
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 items-start">
          {PLANS.map((p, i) => (
            <div
              key={i}
              className={[
                "reveal-card relative p-8 flex flex-col h-full",
                p.hot ? "ring-card lg:-mt-4 lg:mb-4 shadow-[0_30px_90px_-30px_rgba(249,115,22,0.4)]" : "card",
              ].join(" ")}
            >
              {p.hot && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-b from-amber to-accent text-[#1a0d02] text-[0.66rem] font-display font-bold tracking-wide px-3.5 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <h3 className="font-display font-bold text-xl text-ink mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display font-extrabold text-3xl text-ink">{p.setup}</span>
                <span className="text-mut text-sm">setup</span>
              </div>
              <p className="text-ember font-display font-semibold text-[0.95rem] mb-4">{p.mo}</p>
              <p className="text-mut text-[0.85rem] leading-relaxed mb-6">{p.desc}</p>

              <ul className="flex-1 flex flex-col gap-3 mb-7">
                {p.features.map((f, j) => (
                  <li key={j} className="flex gap-2.5 text-[0.84rem] text-mut">
                    <span className="text-accent shrink-0 mt-0.5" aria-hidden="true">✦</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/apply"
                className={p.hot ? "btn-primary w-full" : "btn-ghost w-full"}
              >
                Get started
              </a>
            </div>
          ))}
        </div>

        <p className="reveal-head mt-10 text-center text-[0.78rem] text-dim">
          All plans billed in USD. Setup is one-time. Monthly ops ongoing while your platform is live.
        </p>
      </div>
    </section>
  );
}
