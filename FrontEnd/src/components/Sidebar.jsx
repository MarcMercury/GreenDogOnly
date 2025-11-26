

import React from "react";

const links = [
  { label: "News", value: "news", icon: "📰" },
  { label: "Employee Directory", value: "employee directory", icon: "👥", options: [
    { label: "Directory", onClick: () => window.location.hash = "#employee-directory" },
    { label: "Download Directory", onClick: () => alert("Download Directory") }
  ] },
  { label: "Recruiting", value: "recruiting", icon: "➕", options: [
    { label: "Pipeline", onClick: () => window.location.hash = "#recruiting" },
    { label: "Create Prospect", onClick: () => window.location.hash = "#create-prospect" }
  ] },
  { label: "Employees", value: "employee", icon: "🧑‍💼", options: [
    { label: "Employee List", onClick: () => window.location.hash = "#employee" },
    { label: "Create Employee", onClick: () => window.location.hash = "#create-employee" },
    { label: "Upload Employees", onClick: () => window.location.hash = "#upload-employees" },
    { label: "Download Template", onClick: () => alert("Download Template") }
  ] },
  { label: "Skills", value: "skills", icon: "🎯" },
  { label: "Schedule", value: "schedule", icon: "📅" },
  { label: "Change Log", value: "change log", icon: "📝" },
];

export default function Sidebar({ current, onNavigate }) {
  return (
    <nav className="cr-nav-pane" style={{ padding: "32px 0 0 0" }}>
        {links.map(link => (
          <div key={link.value} style={{ position: "relative" }}>
            <div
              className={"cr-nav-link" + (current === link.value ? " cr-nav-link-active" : "")}
              onClick={() => onNavigate(link.value)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "12px 32px 12px 24px",
                marginBottom: 8,
                fontSize: 16,
                fontWeight: current === link.value ? 700 : 500,
                color: current === link.value ? "var(--crateso-amber)" : "var(--text-primary)",
                background: current === link.value ? "linear-gradient(90deg, #FFC857 0%, #FF6B35 100%)" : "none",
                borderRadius: current === link.value ? "14px" : "10px",
                boxShadow: current === link.value ? "0 0 14px rgba(255,200,87,0.35)" : "none",
                cursor: "pointer",
                transition: "all 0.22s cubic-bezier(0.25, 0.8, 0.25, 1)",
                position: "relative",
                zIndex: 2,
              }}
            >
              <span style={{ fontSize: 20, color: "var(--crateso-gold)", marginRight: 12 }}>{link.icon}</span>
              <span>{link.label}</span>
              {current === link.value && (
                <span style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 6,
                  borderRadius: "6px 0 0 6px",
                  background: "linear-gradient(180deg, #FFC857 0%, #FF6B35 100%)",
                  boxShadow: "0 0 14px rgba(255,200,87,0.35)",
                }} />
              )}
            </div>
            {current === link.value && link.options && (
              <div className="cr-sidebar-options" style={{ position: "absolute", left: 0, top: "100%", background: "rgba(24,28,42,0.98)", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.18)", padding: "8px 12px", zIndex: 99 }}>
                {link.options.map((opt) => (
                  <div key={opt.label} style={{ fontSize: 13, color: "#FFD700", margin: "4px 0", cursor: "pointer" }} onClick={opt.onClick}>{opt.label}</div>
                ))}
              </div>
            )}
          </div>
        ))}
    </nav>
  );
}