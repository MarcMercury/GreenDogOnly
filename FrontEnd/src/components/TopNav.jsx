

import React from "react";

export default function TopNav({ operator }) {
  return (
    <header className="cr-header-pane" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: 64 }}>
      <div style={{ fontSize: 32, fontWeight: 700, color: "#F5EEDC", textShadow: "0 0 14px rgba(255,200,87,0.2)" }}>
        Employee Operations Console
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span style={{ fontSize: 16, color: "#C8C4B8", fontWeight: 500 }}>Operator: {operator}</span>
      </div>
    </header>
  );
}