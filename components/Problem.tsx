"use client";

import { useEffect, useRef } from "react";
import { applyScrollReveals } from "@/lib/scroll-reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SpotlightCard from "@/components/ui/SpotlightCard";

const CARDS = [
  {
    icon: "◷",
    title: "You can't be on-call 24/7",
    body: "Your students ask the same questions at 2am that you answered in your last live. The answer exists — it just stops working when you step away.",
  },
  {
    icon: "◎",
    title: "Your audience wants access, not just content",
    body: "Followers watch. Students ask. The gap between posting and being present is exactly where your most serious people quietly move on.",
  },
  {
    icon: "✶",
    title: "Generic AI doesn't sound like you",
    body: "ChatGPT gives everyone the same answer. Your students chose you for your frameworks and point of view — not another faceless bot.",
  },
];

export default function Problem() {
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
          from: { y: 30, opacity: 0 },
          to: { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 },
        },
        {
          selector: ".reveal-card",
          from: { y: 46, opacity: 0 },
          to: { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.12 },
        },
        {
          selector: ".reveal-bridge",
          from: { x: -20, opacity: 0 },
          to: { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        },
      ],
      reducedMotion
    );
  }, [reducedMotion]);

  return (
    <section ref={sec} className="section">
      <div className="shell">
        <p className="reveal-head eyebrow mb-5">
          <span className="text-ember">01</span> The gap
        </p>
        <h2 className="reveal-head display-lg max-w-2xl mb-16">
          Your content works.{" "}
          <span className="font-serif-i text-mut">your availability doesn&apos;t.</span>
        </h2>

        <div className="grid gap-5 md:grid-cols-3 mb-16">
          {CARDS.map((c, i) => (
            <SpotlightCard key={i} className="reveal-card p-8">
              <div
                className="text-2xl mb-6 w-12 h-12 rounded-xl flex items-center justify-center border border-line bg-bg2 text-ember"
                aria-hidden="true"
              >
                {c.icon}
              </div>
              <h3 className="font-display font-semibold text-lg text-ink mb-3">
                {c.title}
              </h3>
              <p className="text-mut text-[0.9rem] leading-relaxed">{c.body}</p>
            </SpotlightCard>
          ))}
        </div>

        <div className="reveal-bridge relative pl-7">
          <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-amber to-ember" />
          <p className="text-ink text-xl sm:text-2xl font-display font-medium leading-snug max-w-3xl">
            Creator Ops solves all three — an AI platform that teaches in your
            voice, scales your access, and runs{" "}
            <span className="text-ember font-serif-i">around the clock</span>{" "}
            without you lifting a finger.
          </p>
        </div>
      </div>
    </section>
  );
}
