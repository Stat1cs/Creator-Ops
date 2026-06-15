"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { applyScrollReveals } from "@/lib/scroll-reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STEPS = [
  {
    n: "01",
    title: "We extract your knowledge",
    body: "Your content, frameworks, tone, and transformation — pulled from courses, calls, docs, and posts. We map how you teach, not just what you know.",
    detail: "Onboarding call + content audit · 2–3 days",
  },
  {
    n: "02",
    title: "We build your AI platform",
    body: "Fully branded, subscription-ready, trained exclusively on your material. It sounds like you because it is you — distilled into a system that runs without you.",
    detail: "Build + training · 5–10 days",
  },
  {
    n: "03",
    title: "You launch — we operate",
    body: "Live in under 30 days with an embed, Discord bot, WhatsApp line, and direct link. We handle the tech, updates, and ongoing optimization.",
    detail: "Live in under 30 days · ongoing ops included",
  },
];

export default function HowItWorks() {
  const sec = useRef<HTMLElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const scope = sec.current;
    if (!scope) return;

    const cleanup = applyScrollReveals(
      scope,
      [
        {
          selector: ".reveal-title",
          from: { y: 30 },
          to: { y: 0, duration: 0.8, ease: "power2.out" },
        },
        {
          selector: ".reveal-head",
          from: { y: 28, opacity: 0 },
          to: { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1 },
        },
        {
          selector: ".reveal-step",
          from: { x: -30, opacity: 0 },
          to: { x: 0, opacity: 1, duration: 0.65, ease: "power2.out", stagger: 0.16 },
        },
      ],
      reducedMotion
    );

    let cleanupLine = () => {};
    const el = line.current;
    if (el) {
      if (reducedMotion) {
        gsap.set(el, { scaleY: 1 });
      } else {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            el,
            { scaleY: 0, transformOrigin: "top" },
            {
              scaleY: 1,
              duration: 1.4,
              ease: "power2.inOut",
              scrollTrigger: { trigger: el, start: "top 80%" },
            }
          );
        }, scope);
        cleanupLine = () => ctx.revert();
      }
    }

    return () => {
      cleanup();
      cleanupLine();
    };
  }, [reducedMotion]);

  return (
    <section id="how-it-works" ref={sec} className="section border-t border-line">
      <div className="shell">
        <p className="reveal-head eyebrow mb-5">
          <span className="text-ember">02</span> The process
        </p>
        <h2 className="reveal-title display-lg mb-16">
          Done-for-you.{" "}
          <span className="font-serif-i text-gradient">start to finish.</span>
        </h2>

        <div className="relative">
          <div
            ref={line}
            aria-hidden="true"
            className="hidden md:block absolute left-[2.4rem] top-8 bottom-8 w-px bg-gradient-to-b from-amber/50 via-ember/30 to-transparent"
          />

          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`reveal-step flex gap-6 sm:gap-8 items-start py-9 ${
                i < STEPS.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <div className="shrink-0 w-[4.8rem] h-[4.8rem] rounded-2xl border border-line bg-gradient-to-b from-card2 to-card flex items-center justify-center font-display font-bold text-xl text-ember">
                {s.n}
              </div>
              <div className="flex-1 pt-1.5">
                <h3 className="font-display font-semibold text-xl text-ink mb-2.5">
                  {s.title}
                </h3>
                <p className="text-mut text-[0.92rem] leading-relaxed max-w-2xl mb-3">
                  {s.body}
                </p>
                <p className="text-[0.72rem] text-accent/80 font-medium tracking-wide uppercase">
                  {s.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal-step mt-10 text-mut">
          You own everything.{" "}
          <span className="text-ink font-display font-medium">We operate it.</span>
        </p>
      </div>
    </section>
  );
}
