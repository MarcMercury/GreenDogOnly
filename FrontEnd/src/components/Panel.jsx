

import React from "react";

export default function Panel({ children }) {
  return (
    <div className="cr-card cr-fade-in" style={{ padding: 24, borderRadius: 18, backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,200,87,0.15)", boxShadow: "0 8px 18px rgba(0,0,0,0.35)" }}>
      {children}
    </div>
  );
}