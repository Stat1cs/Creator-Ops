"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Spotlight from "@/components/ui/Spotlight";
import ShinyText from "@/components/ui/ShinyText";
import MagneticButton from "@/components/ui/MagneticButton";

function splitChars(text: string) {
  return text.split("").map((ch, i) => (
    <span key={i} className="char" aria-hidden="true">
      <span>{ch === " " ? "\u00a0" : ch}</span>
    </span>
  ));
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const fade = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [poolBottom, setPoolBottom] = useState("0px");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const hero = sectionRef.current;
    if (!hero) return;

    const updatePoolBottom = () => {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return;

      const heroRect = hero.getBoundingClientRect();
      const scrollRect = scrollEl.getBoundingClientRect();
      const fromHeroBottom = heroRect.bottom - scrollRect.bottom;
      setPoolBottom(`${Math.max(0, fromHeroBottom)}px`);
    };

    updatePoolBottom();
    window.addEventListener("resize", updatePoolBottom);
    return () => window.removeEventListener("resize", updatePoolBottom);
  }, []);

  useEffect(() => {
    const chars = [
      ...(line1.current?.querySelectorAll(".char > span") ?? []),
      ...(line2.current?.querySelectorAll(".char > span") ?? []),
    ];
    const fadeEls = fade.current?.querySelectorAll<HTMLElement>("[data-fade]") ?? [];

    if (reducedMotion) {
      gsap.set(chars, { y: "0%", opacity: 1 });
      gsap.set(fadeEls, { y: 0, opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ delay: 0.25 });
    tl.to(chars, {
      y: "0%",
      opacity: 1,
      duration: 0.9,
      ease: "power4.out",
      stagger: 0.018,
    });
    tl.fromTo(
      fadeEls,
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.12 },
      "-=0.5"
    );
    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-svh flex flex-col overflow-hidden"
    >
      {!reducedMotion && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Spotlight
            intensity={1}
            mobileIntensity={0.62}
            poolBottom={poolBottom}
            followMouse
            mouseInfluence={0.14}
          />
        </div>
      )}

      {/* light edge vignette — keeps corners dark like the reference */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(ellipse_95%_85%_at_50%_48%,transparent_50%,rgba(0,0,0,0.45)_100%)]"
      />
      {/* minimal headline scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[3] pointer-events-none bg-[radial-gradient(ellipse_34%_26%_at_50%_46%,rgba(0,0,0,0.22),transparent_68%)]"
      />

      <div
        ref={fade}
        className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-5 sm:px-8 text-center pt-28 sm:pt-32 pb-8 sm:pb-10"
      >
        <div
          data-fade
          className="inline-flex items-center gap-2.5 mb-8 rounded-full border border-line bg-card/70 backdrop-blur px-4 py-1.5 text-xs"
          style={{ opacity: 0 }}
        >
          <span className="pulse-dot" aria-hidden="true" />
          <ShinyText text="Accepting 3 founding creators — $0 setup fee" />
        </div>

        <h1 className="display-xl" aria-label="A 24/7 AI version of you.">
          <span ref={line1} className="block">
            {splitChars("A 24/7 AI version")}
          </span>
          <span ref={line2} className="block">
            {splitChars("of ")}
            <span className="char">
              <span className="font-serif-i text-ember">you.</span>
            </span>
          </span>
        </h1>

        <p
          data-fade
          className="lede mt-8 max-w-2xl mx-auto"
          style={{ opacity: 0 }}
        >
          Creator Ops builds and operates branded AI platforms
          <br />
          Trained on your content, your voice, your frameworks
          <br />
          and your students can pay to access it.
        </p>

        <div
          data-fade
          className="mt-10 flex flex-col sm:flex-row gap-3.5 justify-center items-center"
          style={{ opacity: 0 }}
        >
          <MagneticButton href="#demo">
            Try the live AI demo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
          <MagneticButton href="/apply" variant="ghost" strength={0.25}>
            Apply for a spot
          </MagneticButton>
        </div>

        <div
          data-fade
          className="mt-12 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 sm:gap-x-3 text-[0.58rem] sm:text-[0.72rem] tracking-wide sm:tracking-wider uppercase text-ink"
          style={{ opacity: 0 }}
        >
          {["Coaches", "Course creators", "Niche educators"].map(
            (t, i) => (
              <span key={t} className="inline-flex items-center gap-3">
                {i > 0 && <span className="text-gradient">/</span>}
                {t}
              </span>
            )
          )}
        </div>
      </div>

      <div
        ref={scrollRef}
        aria-hidden="true"
        className="relative z-10 shrink-0 flex flex-col items-center gap-2 pb-0"
      >
        <span className="text-[0.6rem] tracking-[0.3em] uppercase text-ink">
          Scroll
        </span>
        <span className="w-px h-9 scroll-line" />
      </div>
    </section>
  );
}
