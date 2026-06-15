"use client";

import { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

export type SpotlightProps = {
  color?: string;
  intensity?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  /** CSS distance from container bottom to the floor pool baseline */
  poolBottom?: string;
  className?: string;
};

type Vec2 = [number, number];
type Vec3 = [number, number, number];

type Uniforms = {
  iResolution: { value: Vec2 };
  spotColor: { value: Vec3 };
  intensity: { value: number };
  sourcePos: { value: Vec2 };
  targetPos: { value: Vec2 };
  mousePos: { value: Vec2 };
  mouseInfluence: { value: number };
};

const DEFAULT_COLOR = "#ffffff";

function hexToRgb(hex: string): Vec3 {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]
    : [1, 1, 1];
}

function parsePoolBottom(value: string): number {
  const n = parseFloat(value);
  return Number.isFinite(n) ? Math.max(0, n) : 0;
}

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG = `precision highp float;

uniform vec2 iResolution;
uniform vec3 spotColor;
uniform float intensity;
uniform vec2 sourcePos;
uniform vec2 targetPos;
uniform vec2 mousePos;
uniform float mouseInfluence;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float floorGrain(vec2 coord, vec2 center, float poolMask) {
  vec2 g = (coord - center) / max(iResolution.y, 1.0);
  float n = hash(floor(g * 420.0));
  return mix(1.0, 0.88 + n * 0.12, poolMask);
}

float ambientFloorStrip(vec2 coord, vec2 baseline, float w, float h, float panAmount) {
  if (panAmount < 0.01) return 0.0;

  float dy = baseline.y - coord.y;
  if (dy < -h * 0.02) return 0.0;

  float nx = (coord.x - w * 0.5) / (w * 0.62 + 1.0);
  float ny = max(dy, 0.0) / (h * 0.07 + 1.0);
  float strip = exp(-(nx * nx) * 0.55 - (ny * ny) * 0.95);
  strip *= smoothstep(-h * 0.015, 0.0, dy);
  return strip * 0.11 * smoothstep(0.01, 0.06, panAmount);
}

float floorPool(vec2 coord, vec2 baseline, float w, float h, float edgeSoftness, float panX) {
  float dx = coord.x - baseline.x;
  float dy = baseline.y - coord.y;

  float panBias = panX / max(w, 1.0);
  float widen = 1.0 + edgeSoftness * 0.18;
  float poolXLeft = w * 0.41 * widen * (1.0 + max(-panBias, 0.0) * 0.35);
  float poolXRight = w * 0.41 * widen * (1.0 + max(panBias, 0.0) * 0.35);
  float poolX = dx >= 0.0 ? poolXRight : poolXLeft;
  float poolY = h * 0.052;
  float nx = dx / (poolX + 1.0);
  float ny = max(dy, 0.0) / (poolY + 1.0);

  float core = exp(-(nx * nx) * 0.78 - (ny * ny) * 1.05);
  core = pow(core, 1.45);

  float outer = exp(-(nx * nx) * 0.28 - (ny * ny) * 0.38) * 0.18;

  float pool = max(core, outer);
  pool *= smoothstep(-poolY * 0.35, 0.0, dy);
  return pool * 0.48;
}

float stageSpotlight(vec2 coord) {
  float w = iResolution.x;
  float h = iResolution.y;

  vec2 baseline = targetPos;
  vec2 beamTarget = targetPos;
  float edgeSoftness = 0.0;
  float panX = 0.0;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreen = mousePos * iResolution;
    panX = (mouseScreen.x - targetPos.x) * mouseInfluence;
    baseline.x += panX;
    beamTarget.x += panX;
    edgeSoftness = abs(panX) / max(w * 0.5, 1.0);
  }

  vec2 source = sourcePos;
  vec2 beam = beamTarget - source;
  float beamLen = max(length(beam), 1.0);
  vec2 beamDir = beam / beamLen;

  float light = 0.0;
  float panAmount = abs(panX) / max(w, 1.0);
  light += ambientFloorStrip(coord, baseline, w, h, panAmount);
  float pool = floorPool(coord, baseline, w, h, edgeSoftness, panX);
  light += pool;

  float poolDx = abs(coord.x - baseline.x);
  float poolDy = baseline.y - coord.y;
  if (poolDy > -h * 0.01 && poolDy < h * 0.08) {
    float floorFill = exp(-poolDx / (w * 0.36)) * exp(-max(poolDy, 0.0) / (h * 0.045)) * 0.09;
    light += floorFill;
  }

  float edgeDx = panX >= 0.0 ? (w - coord.x) : coord.x;
  if (panAmount > 0.01 && edgeDx < w * 0.22 && poolDy > -h * 0.02 && poolDy < h * 0.12) {
    float edgeFill = smoothstep(w * 0.22, w * 0.04, edgeDx);
    edgeFill *= exp(-max(poolDy, 0.0) / (h * 0.05)) * 0.07;
    light += edgeFill;
  }

  float along = dot(coord - source, beamDir);
  if (along >= 0.0 && along <= beamLen * 1.02) {
    float t = along / beamLen;
    vec2 onAxis = source + beamDir * along;
    float radial = length(coord - onAxis);

    float halfW = mix(h * 0.006, w * 0.46, pow(t, 0.84));
    float core = exp(-(radial * radial) / (halfW * halfW * 0.48 + 0.5));
    float halo = exp(-(radial * radial) / (halfW * halfW * 1.2 + 2.0)) * 0.55;
    float cone = max(core, halo);

    float topFlare = exp(-t * 2.0) * 0.58;
    float midHaze = 0.34 * (1.0 - 0.12 * smoothstep(0.2, 0.5, t) * (1.0 - smoothstep(0.5, 0.75, t)));
    float lowerGlow = 0.28 * smoothstep(0.52, 0.97, t);
    lowerGlow *= 1.0 - smoothstep(0.88, 1.0, t) * 0.65;
    lowerGlow += smoothstep(0.82, 0.98, t) * exp(-radial / (w * 0.52)) * 0.12;

    float beam = cone * (topFlare + midHaze + lowerGlow);
    light += beam * (1.0 - pool * 0.22);
  }

  float srcDist = length(coord - source);
  light += exp(-srcDist / (h * 0.034)) * 0.44;

  light *= intensity;
  light *= floorGrain(coord, baseline, smoothstep(0.03, 0.42, pool) * 0.22);

  return light;
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
  float light = stageSpotlight(coord);
  gl_FragColor = vec4(spotColor, clamp(light, 0.0, 1.0));
}`;

export default function SpotlightWebGL({
  color = DEFAULT_COLOR,
  intensity = 1,
  followMouse = true,
  mouseInfluence = 0.14,
  poolBottom = "0px",
  className = "",
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<Uniforms | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.78 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.78 });
  const animationIdRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const needsRenderRef = useRef(true);
  const poolBottomRef = useRef(poolBottom);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry?.isIntersecting ?? false),
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    poolBottomRef.current = poolBottom;

    const container = containerRef.current;
    const renderer = rendererRef.current;
    const uniforms = uniformsRef.current;
    if (!container || !renderer || !uniforms) return;

    const dpr = renderer.dpr;
    const w = container.clientWidth * dpr;
    const h = container.clientHeight * dpr;
    const poolOffset = parsePoolBottom(poolBottom) * dpr;

    uniforms.targetPos.value = [w * 0.5, h - poolOffset];
    needsRenderRef.current = true;
  }, [poolBottom]);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    cleanupRef.current?.();
    cleanupRef.current = null;

    const init = async () => {
      const container = containerRef.current;
      if (!container) return;

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });

      if (!containerRef.current) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true,
        premultipliedAlpha: false,
      });
      rendererRef.current = renderer;

      const { gl } = renderer;
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.clearColor(0, 0, 0, 0);

      container.replaceChildren(gl.canvas);

      const uniforms: Uniforms = {
        iResolution: { value: [1, 1] },
        spotColor: { value: hexToRgb(color) },
        intensity: { value: intensity },
        sourcePos: { value: [0, 0] },
        targetPos: { value: [0, 0] },
        mousePos: { value: [0.5, 0.78] },
        mouseInfluence: { value: followMouse ? mouseInfluence : 0 },
      };
      uniformsRef.current = uniforms;

      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms,
        transparent: true,
      });

      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
      meshRef.current = mesh;

      const updatePlacement = () => {
        if (!containerRef.current || !rendererRef.current || !uniformsRef.current) return;

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.dpr = Math.min(window.devicePixelRatio, 2);
        renderer.setSize(wCSS, hCSS);

        const dpr = renderer.dpr;
        const w = wCSS * dpr;
        const h = hCSS * dpr;
        const poolOffset = parsePoolBottom(poolBottomRef.current) * dpr;

        uniformsRef.current.iResolution.value = [w, h];
        uniformsRef.current.sourcePos.value = [w * 0.5, -h * 0.03];
        uniformsRef.current.targetPos.value = [w * 0.5, h - poolOffset];
        needsRenderRef.current = true;
      };

      const render = () => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) return;

        if (followMouse && mouseInfluence > 0) {
          const smoothing = 0.92;
          smoothMouseRef.current.x =
            smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing);
          smoothMouseRef.current.y =
            smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing);
          uniformsRef.current.mousePos.value = [
            smoothMouseRef.current.x,
            smoothMouseRef.current.y,
          ];
        }

        if (!needsRenderRef.current && !(followMouse && mouseInfluence > 0)) return;

        try {
          renderer.render({ scene: mesh });
          needsRenderRef.current = followMouse && mouseInfluence > 0;
        } catch (error) {
          console.warn("Spotlight WebGL render error:", error);
        }
      };

      const loop = () => {
        render();
        animationIdRef.current = requestAnimationFrame(loop);
      };

      window.addEventListener("resize", updatePlacement);
      updatePlacement();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupRef.current = () => {
        if (animationIdRef.current !== null) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
        window.removeEventListener("resize", updatePlacement);

        try {
          const loseContext = gl.getExtension("WEBGL_lose_context");
          loseContext?.loseContext();
          gl.canvas.remove();
        } catch (error) {
          console.warn("Spotlight cleanup error:", error);
        }

        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };

    void init();

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [isVisible, color, intensity, followMouse, mouseInfluence]);

  useEffect(() => {
    if (!followMouse) return;

    const handleMouseMove = (event: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
      needsRenderRef.current = true;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [followMouse]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full bg-black pointer-events-none overflow-hidden relative ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
