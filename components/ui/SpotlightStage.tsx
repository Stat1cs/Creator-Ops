"use client";

import { useId, type CSSProperties } from "react";

export type SpotlightStageProps = {
  className?: string;
  intensity?: number;
  poolBottom?: string;
};

export default function SpotlightStage({
  className = "",
  intensity = 1,
  poolBottom = "0px",
}: SpotlightStageProps) {
  const grainId = useId().replace(/:/g, "");
  const scale = Math.max(0.5, Math.min(intensity, 1.5));

  return (
    <div
      className={`relative w-full h-full bg-black overflow-hidden pointer-events-none ${className}`.trim()}
      aria-hidden="true"
      style={{ "--spot": scale, "--pool-bottom": poolBottom } as CSSProperties}
    >
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id={grainId} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.55" />
          </feComponentTransfer>
        </filter>
      </svg>

      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white"
        style={{
          top: "-1.5%",
          width: "14vmin",
          height: "5vmin",
          opacity: 0.5 * scale,
          filter: "blur(52px)",
        }}
      />

      <div
        className="absolute inset-x-0 top-0 bottom-[var(--pool-bottom)]"
        style={{
          background:
            "conic-gradient(from 270deg at 50% -3%, transparent 0deg, rgba(255,255,255,0.06) 52deg, rgba(255,255,255,0.11) 90deg, rgba(255,255,255,0.06) 128deg, transparent 180deg)",
          filter: "blur(44px)",
          opacity: scale,
        }}
      />

      <div
        className="absolute inset-x-0 top-0 bottom-[var(--pool-bottom)]"
        style={{
          clipPath: "polygon(49.1% 0%, 50.9% 0%, 73% 100%, 27% 100%)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.16) 32%, rgba(255,255,255,0.13) 58%, rgba(255,255,255,0.24) 90%, rgba(255,255,255,0.1) 100%)",
          filter: "blur(26px)",
          opacity: scale,
        }}
      />

      <div
        className="absolute inset-x-0 top-0 bottom-[var(--pool-bottom)]"
        style={{
          clipPath: "polygon(49.6% 0%, 50.4% 0%, 63% 100%, 37% 100%)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.14) 100%)",
          filter: "blur(14px)",
          opacity: scale,
        }}
      />

      <div
        className="absolute left-1/2"
        style={{
          bottom: "var(--pool-bottom)",
          width: "82%",
          height: "10.5vmin",
          transform: "translateX(-50%) translateY(50%)",
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.78) 16%, rgba(255,255,255,0.32) 40%, rgba(255,255,255,0.07) 66%, transparent 100%)",
          filter: "blur(6px)",
          opacity: scale,
        }}
      />

      <div
        className="absolute left-1/2 overflow-hidden"
        style={{
          bottom: "var(--pool-bottom)",
          width: "82%",
          height: "10.5vmin",
          transform: "translateX(-50%) translateY(50%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 50% 50% at 50% 50%, #000 0%, #000 38%, transparent 72%)",
          maskImage:
            "radial-gradient(ellipse 50% 50% at 50% 50%, #000 0%, #000 38%, transparent 72%)",
          opacity: 0.22 * scale,
          mixBlendMode: "multiply",
        }}
      >
        <div
          className="absolute inset-[-50%] w-[200%] h-[200%] bg-white"
          style={{ filter: `url(#${grainId})` }}
        />
      </div>
    </div>
  );
}
