"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    let disposed = false;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    renderer.setSize(W(), H());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W() / H(), 0.1, 100);
    camera.position.z = 8;

    const isMobile = W() < 768;
    const COUNT = isMobile ? 1800 : 4000;

    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    const phi = Math.PI * (Math.sqrt(5) - 1);
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = phi * i;
      const radius = 3.5 + (Math.random() - 0.5) * 1.2;

      positions[i * 3] = Math.cos(th) * r * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = Math.sin(th) * r * radius;

      const roll = Math.random();
      if (roll < 0.16) {
        // amber sparks
        colors[i * 3] = 251 / 255;
        colors[i * 3 + 1] = 191 / 255;
        colors[i * 3 + 2] = 36 / 255;
        sizes[i] = Math.random() * 4 + 2.2;
      } else if (roll < 0.28) {
        // ember
        colors[i * 3] = 234 / 255;
        colors[i * 3 + 1] = 88 / 255;
        colors[i * 3 + 2] = 12 / 255;
        sizes[i] = Math.random() * 3.5 + 1.8;
      } else {
        // warm cream dust
        const b = 0.35 + Math.random() * 0.5;
        colors[i * 3] = (248 / 255) * b;
        colors[i * 3 + 1] = (236 / 255) * b;
        colors[i * 3 + 2] = (214 / 255) * b;
        sizes[i] = Math.random() * 2.2 + 0.5;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    // RawShaderMaterial avoids Three.js chunk injection conflicting with custom attributes
    const mat = new THREE.RawShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        precision highp float;
        attribute vec3 position;
        attribute vec3 color;
        attribute float aSize;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (420.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float a = 1.0 - smoothstep(0.15, 0.5, d);
          gl_FragColor = vec4(vColor, a * 0.9);
        }
      `,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const onMouse = (e: MouseEvent) => {
      tx = (e.clientX / W() - 0.5) * 1.4;
      ty = (e.clientY / H() - 0.5) * 0.9;
    };
    if (!isMobile) window.addEventListener("mousemove", onMouse);

    let raf = 0;
    let visible = !document.hidden;

    const tick = (t: number) => {
      if (disposed || !visible) return;
      raf = requestAnimationFrame(tick);
      const s = t * 0.001;

      cx += (tx - cx) * 0.025;
      cy += (ty - cy) * 0.025;

      points.rotation.y = s * 0.055 + cx * 0.45;
      points.rotation.x = -cy * 0.28;

      renderer.render(scene, camera);
    };

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !disposed) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibility);

    raf = requestAnimationFrame(tick);

    const onResize = () => {
      camera.aspect = W() / H();
      camera.updateProjectionMatrix();
      renderer.setSize(W(), H());
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full z-[1]"
      style={{ opacity: 0.7 }}
    />
  );
}
