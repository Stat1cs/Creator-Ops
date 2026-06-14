import CountUp from "@/components/ui/CountUp";

const STATS = [
  { value: <>&lt;<CountUp to={30} /></>, label: "Days to launch, fully done-for-you" },
  { value: <CountUp to={6} />, label: "Channels we deploy for you" },
  { value: "24/7", label: "Availability, across every timezone" },
  { value: <CountUp to={100} suffix="%" />, label: "Yours to own — we just operate it" },
];

export default function Stats() {
  return (
    <section className="border-y border-line bg-bg2/40">
      <div className="shell grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={i}
            className="px-6 py-10 text-center border-line even:border-l [&:nth-child(n+3)]:border-t lg:border-t-0 lg:border-l lg:first:border-l-0"
          >
            <div className="font-display font-bold text-4xl sm:text-5xl text-gradient mb-2 tabular-nums">
              {s.value}
            </div>
            <p className="text-[0.78rem] text-mut leading-snug max-w-[14rem] mx-auto">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
