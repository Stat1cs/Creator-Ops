"use client";

import { useEffect, useState } from "react";
import SpotlightStage from "@/components/ui/SpotlightStage";
import SpotlightWebGL from "@/components/ui/SpotlightWebGL";

export type SpotlightProps = {
  color?: string;
  intensity?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  /** CSS distance from container bottom to the floor pool baseline */
  poolBottom?: string;
  className?: string;
};

export default function Spotlight({
  className = "",
  intensity = 1,
  poolBottom = "0px",
  color,
  followMouse = true,
  mouseInfluence = 0.14,
}: SpotlightProps) {
  const [useStage, setUseStage] = useState(true);

  useEffect(() => {
    const touchQuery = window.matchMedia("(pointer: coarse)");
    const narrowQuery = window.matchMedia("(max-width: 767px)");

    const update = () => {
      setUseStage(touchQuery.matches || narrowQuery.matches);
    };

    update();
    touchQuery.addEventListener("change", update);
    narrowQuery.addEventListener("change", update);

    return () => {
      touchQuery.removeEventListener("change", update);
      narrowQuery.removeEventListener("change", update);
    };
  }, []);

  if (useStage) {
    return (
      <SpotlightStage
        className={className}
        intensity={intensity}
        poolBottom={poolBottom}
      />
    );
  }

  return (
    <SpotlightWebGL
      className={className}
      intensity={intensity}
      poolBottom={poolBottom}
      color={color}
      followMouse={followMouse}
      mouseInfluence={mouseInfluence}
    />
  );
}
