"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Channels", href: "#channels" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export default function Nav() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    if (reducedMotion) {
      gsap.set(shell, { y: 0, opacity: 1 });
    } else {
      gsap.fromTo(
        shell,
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.6 }
      );
    }

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        ref={shellRef}
        style={{ opacity: 0 }}
        className="fixed top-3 sm:top-5 inset-x-0 z-50 px-4 pointer-events-none"
      >
        <nav
          aria-label="Main"
          className={[
            "pointer-events-auto mx-auto max-w-4xl flex items-center gap-2 h-14 pl-3 pr-2 sm:pl-4 sm:pr-2.5 rounded-full border transition-all duration-300",
            scrolled || menuOpen
              ? "bg-bg/75 border-line backdrop-blur-2xl shadow-[0_16px_50px_-12px_rgba(0,0,0,0.7)]"
              : "bg-bg/40 border-line/60 backdrop-blur-xl",
          ].join(" ")}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 mr-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            aria-label="Creator Ops home"
          >
            <span className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-black text-[#1a0d02] font-display bg-gradient-to-b from-amber to-accent shadow-[0_4px_14px_rgba(249,115,22,0.4)]">
              CO
            </span>
            <span className="text-ink font-display font-semibold text-[0.95rem] tracking-tight hidden sm:inline">
              Creator Ops
            </span>
          </Link>

          <div className="hidden md:flex flex-1 items-center justify-center gap-0.5">
            {LINKS.map(({ label, href }) => (
              <a key={href} href={href} className="nav-link">
                {label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 ml-auto shrink-0">
            <Link href="/apply" className="nav-cta">
              Apply now
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden ml-auto flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-full border border-line bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={`block w-[18px] h-0.5 bg-ink transition-transform duration-200 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block w-[18px] h-0.5 bg-ink transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-[18px] h-0.5 bg-ink transition-transform duration-200 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      <div
        id="mobile-nav"
        className={[
          "fixed inset-0 z-40 md:hidden transition-opacity duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-bg/80 backdrop-blur-md"
          aria-label="Close menu"
          onClick={close}
        />
        <div
          className={[
            "absolute top-20 inset-x-0 mx-4 box-border card p-5 max-h-[calc(100dvh-7rem)] overflow-y-auto transition-transform duration-300",
            menuOpen ? "translate-y-0" : "-translate-y-4",
          ].join(" ")}
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={close}
                className="px-4 py-3.5 rounded-xl text-[0.95rem] text-mut hover:text-ink hover:bg-card2 transition-colors font-display"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-line">
            <Link href="/apply" onClick={close} className="btn-primary w-full">
              Apply now →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
