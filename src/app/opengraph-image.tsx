import { ImageResponse } from "next/og";

export const alt =
  "The Origin Physiotherapy & Rehabilitation in Saibaba Colony, Coimbatore";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "linear-gradient(135deg, #f8f6ec 0%, #e7efe4 55%, #cbdcc7 100%)",
          color: "#214b3a",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px solid #6b8f71",
            borderRadius: "999px",
            color: "#456b50",
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.12em",
            marginBottom: 30,
            padding: "12px 24px",
            textTransform: "uppercase",
          }}
        >
          The Origin
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 58,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            textAlign: "center",
          }}
        >
          Physiotherapy &amp; Rehabilitation
        </div>
        <div
          style={{
            color: "#456b50",
            display: "flex",
            fontSize: 32,
            marginTop: 24,
          }}
        >
          Saibaba Colony, Coimbatore
        </div>
      </div>
    ),
    size,
  );
}
