import React from "react";
import Link from "next/link";

export default function Logo({ size = "normal" }) {
  const isSmall = size === "small";

  return (
    <div className="nav__logo" style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          width: isSmall ? "36px" : "44px",
          height: isSmall ? "36px" : "44px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #29b6f6 0%, #1976d2 50%, #0d47a1 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(25, 118, 210, 0.35)",
          flexShrink: 0,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: isSmall ? "20px" : "26px", height: isSmall ? "20px" : "26px" }}
        >
          <path d="M12 4v16m-8-8h16" />
          <circle cx="12" cy="12" r="9" strokeOpacity="0.35" strokeWidth="1.5" />
        </svg>
      </div>

      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
        <span
          style={{
            fontFamily: "var(--font-heading, Outfit, sans-serif)",
            fontSize: isSmall ? "1.1rem" : "1.3rem",
            fontWeight: 800,
            color: "var(--clr-primary-dark, #0d47a1)",
            letterSpacing: "-0.5px",
          }}
        >
          Life <span style={{ color: "var(--clr-primary, #1976d2)" }}>&amp;</span> Health
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1.2px",
            color: "var(--clr-secondary, #0288d1)",
          }}
        >
          Portal Médico
        </span>
      </div>
    </div>
  );
}
