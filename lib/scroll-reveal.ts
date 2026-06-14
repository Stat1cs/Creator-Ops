import { gsap } from "@/lib/gsap";

export type ScrollRevealItem = {
  selector: string;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  trigger?: string;
  start?: string;
};

export function applyScrollReveals(
  scope: HTMLElement,
  items: ScrollRevealItem[],
  reducedMotion: boolean
): () => void {
  if (reducedMotion) {
    items.forEach(({ selector }) => {
      gsap.set(scope.querySelectorAll(selector), {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        scaleY: 1,
      });
    });
    return () => {};
  }

  const ctx = gsap.context(() => {
    items.forEach(({ selector, from, to, trigger, start }) => {
      gsap.fromTo(scope.querySelectorAll(selector), from, {
        ...to,
        scrollTrigger: {
          trigger: trigger ?? selector,
          start: start ?? "top 88%",
        },
      });
    });
  }, scope);

  return () => ctx.revert();
}
