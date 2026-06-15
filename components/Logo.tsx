export const LOGO_SRC = "/logo.svg";
export const LOGO_PNG_SRC = "/android-chrome-512x512.png";

type LogoMarkProps = {
  size?: number;
  className?: string;
};

export function LogoMark({ size = 36, className = "" }: LogoMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt=""
      width={size}
      height={size}
      className={`rounded-lg shrink-0 ${className}`}
    />
  );
}

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  className?: string;
  wordmarkClassName?: string;
};

export default function Logo({
  size = 36,
  showWordmark = true,
  className = "",
  wordmarkClassName = "text-ink font-display font-semibold text-[0.95rem] tracking-tight",
}: LogoProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {showWordmark && <span className={wordmarkClassName}>Creator Ops</span>}
    </span>
  );
}
