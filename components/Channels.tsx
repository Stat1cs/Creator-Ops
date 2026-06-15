"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { applyScrollReveals } from "@/lib/scroll-reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SpotlightCard from "@/components/ui/SpotlightCard";

type Channel = {
  name: string;
  desc: string;
  color: string;
  icon: ReactNode;
};

const CHANNELS: Channel[] = [
  {
    name: "Embedded on your site",
    desc: "Sits inside Kajabi, Teachable, or your own site. No new tab, no new habit.",
    color: "#f97316",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h18M8 13l-2 2 2 2m4 0h3" />
      </svg>
    ),
  },
  {
    name: "Discord",
    desc: "A bot inside your server. Students ask in the same channel they're already in.",
    color: "#5865F2",
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.956 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419Z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    desc: "A number your students can text anytime. Feels like messaging you directly.",
    color: "#25D366",
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13.4 13.4 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.83 9.83 0 0 1 6.988 2.898 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    name: "Slack",
    desc: "Deploys into your paid community workspace — available in every channel.",
    color: "#E01E5A",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    desc: "For communities on Telegram — your AI joins as a group bot.",
    color: "#2AABEE",
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: "Direct link",
    desc: "A clean URL. Drop it in emails, DMs, or a pinned post. One tap and they're in.",
    color: "#fbbf24",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
  },
];

export default function Channels() {
  const sec = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const scope = sec.current;
    if (!scope) return;
    return applyScrollReveals(
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
        {
          selector: ".reveal-card",
          from: { y: 34, opacity: 0 },
          to: { y: 0, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.07 },
        },
      ],
      reducedMotion
    );
  }, [reducedMotion]);

  return (
    <section id="channels" ref={sec} className="section border-t border-line">
      <div className="shell">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="reveal-head eyebrow justify-center mb-5">
            <span className="text-ember">04</span> Deployment
          </p>
          <h2 className="reveal-title display-lg mb-5">
            It lives where your students{" "}
            <span className="font-serif-i text-gradient">already are.</span>
          </h2>
          <p className="reveal-head lede">
            Most AI tools give you a portal students have to remember to visit.
            Yours works wherever your audience already spends their time.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((ch, i) => (
            <SpotlightCard key={i} className="reveal-card flex gap-4 p-6 rounded-2xl">
              <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border"
                style={{
                  color: ch.color,
                  backgroundColor: `${ch.color}1a`,
                  borderColor: `${ch.color}33`,
                }}
              >
                {ch.icon}
              </div>
              <div>
                <p className="font-display font-semibold text-ink text-[0.95rem] mb-1.5">
                  {ch.name}
                </p>
                <p className="text-mut text-[0.82rem] leading-relaxed">{ch.desc}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <p className="reveal-head mt-10 text-center text-mut">
          We handle deployment across all of them.{" "}
          <span className="text-ink font-display font-medium">You don&apos;t touch the tech.</span>
        </p>
      </div>
    </section>
  );
}
