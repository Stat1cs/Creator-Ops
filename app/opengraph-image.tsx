import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Creator Ops — Your AI Platform, Built and Operated";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoSrc = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/android-chrome-512x512.png")
).toString("base64")}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "#0a0807",
          color: "#f8f4ec",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 48,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={56}
            height={56}
            alt=""
            style={{ borderRadius: 12 }}
          />
          <span style={{ fontSize: 28, fontWeight: 600 }}>Creator Ops</span>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 900,
          }}
        >
          A 24/7 AI version of you.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#a89e8e",
            lineHeight: 1.5,
            maxWidth: 820,
          }}
        >
          Branded AI platforms for coaches — trained on your content, deployed
          everywhere your students already are.
        </div>
      </div>
    ),
    { ...size }
  );
}
