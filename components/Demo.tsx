"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { applyScrollReveals } from "@/lib/scroll-reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const EMBED =
  "https://creator-ops.site/deployment-329cbda0-4a4a-4327-ad79-7e52a205612a";

export default function Demo() {
  const sec = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
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
          to: { y: 0, duration: 0.7, ease: "power2.out" },
        },
        {
          selector: ".reveal-head",
          from: { y: 28, opacity: 0 },
          to: { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1 },
        },
      ],
      reducedMotion
    );

    let cleanupFrame = () => {};
    const el = frame.current;
    if (el) {
      if (reducedMotion) {
        gsap.set(el, { y: 0, opacity: 1, scale: 1 });
      } else {
        const ctx = gsap.context(() => {
          gsap.fromTo(
            el,
            { y: 54, opacity: 0, scale: 0.96 },
            {
              y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            }
          );
        }, scope);
        cleanupFrame = () => ctx.revert();
      }
    }

    return () => {
      cleanup();
      cleanupFrame();
    };
  }, [reducedMotion]);

  return (
    <section id="demo" ref={sec} className="section border-t border-line overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] max-w-full pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.10),transparent_60%)]"
      />
      <div className="shell relative">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="reveal-head eyebrow justify-center mb-5">
            <span className="text-ember">03</span> Live demo
          </p>
          <h2 className="reveal-title display-lg mb-5">
            Feel what your platform{" "}
            <span className="font-serif-i text-gradient">could become.</span>
          </h2>
          <p className="reveal-head lede">
            Meet Coach Jordan — a fictional demo coach built on Creator Ops.
            She&apos;ll walk you through a real 10-minute workshop. Picture this
            trained on <em className="text-ink not-italic font-medium">your</em> content.
          </p>
        </div>

        <div
          ref={frame}
          className="ring-card overflow-hidden shadow-[0_40px_120px_-30px_rgba(249,115,22,0.3)]"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-bg2">
            {["#3a342b", "#3a342b", "#3a342b"].map((c, i) => (
              <span key={i} className="w-3 h-3 rounded-full" style={{ background: c }} aria-hidden="true" />
            ))}
            <span className="flex-1 ml-2 bg-card rounded-md px-3 py-1 text-[0.72rem] text-dim font-mono truncate">
              creator-ops.site/demo · Coach Jordan
            </span>
            <span className="text-[0.6rem] tracking-wider text-accent border border-accent/30 bg-accent/10 rounded px-2 py-0.5">
              DEMO
            </span>
          </div>

          <iframe
            src={EMBED}
            title="Coach Jordan — Creator Ops Demo"
            allow="microphone"
            loading="lazy"
            className="w-full border-0 block bg-bg min-h-[560px] sm:min-h-[420px] h-[clamp(560px,85vh,700px)] sm:h-[clamp(420px,72vh,700px)]"
          />
        </div>

        <p className="mt-5 text-center text-[0.78rem] text-dim">
          Jordan is a fictional demo coach. Your platform would be trained on your
          content, your voice, and your brand.
        </p>
      </div>
    </section>
  );
}
