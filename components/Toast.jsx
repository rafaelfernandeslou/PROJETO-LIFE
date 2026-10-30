"use client";

import React from "react";
import { useApp } from "@/context/AppContext";

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const bgColors = {
    success: "#065f46",
    error: "#991b1b",
    warning: "#92400e",
    info: "#102a4e",
  };

  const icons = {
    success: "✓",
    error: "✕",
    warning: "⚠️",
    info: "ℹ️",
  };

  const bg = bgColors[toast.tipo] || bgColors.info;
  const icon = icons[toast.tipo] || icons.info;

  return (
    <div
      className="toast-msg"
      style={{
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <span style={{ fontSize: "1.1rem" }}>{icon}</span>
      <span>{toast.mensagem}</span>
    </div>
  );
}
