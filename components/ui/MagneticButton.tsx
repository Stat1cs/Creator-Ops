"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  strength?: number;
};

export default function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  strength = 0.4,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  function handleMove(e: PointerEvent<HTMLAnchorElement>) {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  }

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={`${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </a>
  );
}
