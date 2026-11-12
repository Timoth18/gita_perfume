import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#f7f2ea", color: "#1f1b16" }}>
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#8a6a3a" }}>PERFUME BOTTLES · ATOMIZERS · PACKAGING</div>
        <div style={{ fontSize: 96, marginTop: 24 }}>{site.name}</div>
        <div style={{ fontSize: 36, marginTop: 24, color: "#5c544a" }}>{site.tagline}</div>
      </div>
    ),
    size
  );
}
