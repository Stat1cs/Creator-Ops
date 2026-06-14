import { ImageResponse } from "next/og";

export const alt = "Creator Ops — Your AI Platform, Built and Operated";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#0a0a0a",
          color: "#f5f1e8",
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
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: "#f97316",
              color: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 900,
            }}
          >
            CO
          </div>
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
            color: "#9b958a",
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
