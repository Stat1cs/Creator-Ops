"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
};

export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1800,
  decimals = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    let raf = 0;
    let start = 0;
    let played = false;

    const animate = (t: number) => {
      if (!start) start = t;
      const progress = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(to * eased);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !played) {
          played = true;
          raf = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration, reducedMotion]);

  const shown = reducedMotion ? to : value;

  return (
    <span ref={ref}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}
