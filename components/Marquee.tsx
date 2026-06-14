const ITEMS = [
  "Course launchers", "Business coaches", "Fitness educators",
  "Parenting experts", "Finance creators", "Mindset coaches",
  "Niche educators", "Podcast hosts", "Tech teachers", "Life coaches",
];

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-wrap relative overflow-hidden border-y border-line py-5 bg-bg2/40">
      {(["left", "right"] as const).map((side) => (
        <div
          key={side}
          aria-hidden="true"
          className="absolute top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{
            [side]: 0,
            background: `linear-gradient(to ${side === "left" ? "right" : "left"}, var(--color-bg), transparent)`,
          }}
        />
      ))}

      <div className="marquee-track">
        {loop.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 px-7 text-sm font-display font-medium text-mut"
          >
            {item}
            <span className="text-ember text-lg leading-none" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
