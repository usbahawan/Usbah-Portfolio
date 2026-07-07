import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Usbah Saleem — Mobile App Developer (Flutter) & AI Integration Engineer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#10251F", // --theme-pine
          backgroundImage: "radial-gradient(circle at 50% 50%, #17362E 0%, #10251F 100%)",
          color: "#f9f8f6", // --theme-paper
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          padding: "80px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern background simulation */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.08,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "60px",
                height: "60px",
                borderRight: "1px solid #f9f8f6",
                borderBottom: "1px solid #f9f8f6",
              }}
            />
          ))}
        </div>

        {/* Outer glowing border */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "30px",
            right: "30px",
            bottom: "30px",
            border: "2px solid rgba(18, 92, 78, 0.4)", // --theme-emerald
            borderRadius: "24px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {/* Tag/Category */}
          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#C9963A", // --theme-ochre
              marginBottom: "32px",
              backgroundColor: "rgba(201, 150, 58, 0.1)",
              padding: "10px 28px",
              borderRadius: "100px",
              border: "1px solid rgba(201, 150, 58, 0.25)",
            }}
          >
            PORTFOLIO
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "82px",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              marginBottom: "24px",
              textAlign: "center",
              color: "#f9f8f6",
            }}
          >
            Usbah Saleem
          </div>

          {/* Divider Line */}
          <div
            style={{
              width: "120px",
              height: "4px",
              backgroundColor: "#125C4E", // --theme-emerald
              marginBottom: "32px",
              borderRadius: "2px",
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: "30px",
              fontWeight: 500,
              color: "#d4d0c5", // slightly muted paper text
              textAlign: "center",
              maxWidth: "900px",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
            }}
          >
            Mobile App Developer (Flutter) &amp; AI Integration Engineer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
