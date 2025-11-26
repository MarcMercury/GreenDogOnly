import React, { useState } from "react";

const ACCENT_COLOR = "#2e8b57"; // green
const ADMIN_PASSWORD = "admin123"; // TODO: Replace with secure backend check

export default function LoginScreen({ onLogin }) {
  const [operatorName, setOperatorName] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("Admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulate password check
    setTimeout(() => {
      setLoading(false);
      if (password !== ADMIN_PASSWORD) {
        setError("Incorrect password. Please try again.");
      } else {
        onLogin({ operatorName, mode });
      }
    }, 700);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: 325,
          padding: 32,
          borderRadius: 8,
          background: "#f4f6f8",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span style={{ fontWeight: 600, fontSize: 18, letterSpacing: 1 }}>
            EMPLOYEE OPERATIONS CONSOLE
          </span>
        </div>
        <label style={{ fontSize: 14, fontWeight: 500 }}>Operator Identity</label>
        <input
          type="text"
          required
          placeholder="Who’s operating today?"
          value={operatorName}
          onChange={(e) => setOperatorName(e.target.value)}
          style={{
            fontSize: 14,
            padding: "6px 10px",
            border: "1px solid #cbd5e1",
            borderRadius: 4,
            outline: "none",
          }}
        />
        <label style={{ fontSize: 14, fontWeight: 500 }}>Password</label>
        <input
          type="password"
          required
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            fontSize: 14,
            padding: "6px 10px",
            border: "1px solid #cbd5e1",
            borderRadius: 4,
            outline: "none",
          }}
        />
        <label style={{ fontSize: 14, fontWeight: 500 }}>Mode</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{
            fontSize: 14,
            padding: "6px 10px",
            border: "1px solid #cbd5e1",
            borderRadius: 4,
            outline: "none",
          }}
        >
          <option value="Admin">Admin</option>
          <option value="Read-Only">Read-Only</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 10,
            background: ACCENT_COLOR,
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "8px 0",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: loading ? "none" : "0 1px 2px rgba(0,0,0,0.03)",
            opacity: loading ? 0.7 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && (
          <div style={{ color: "#b91c1c", fontSize: 13, marginTop: 4 }}>{error}</div>
        )}
        <div style={{ fontSize: 11, color: "#64748b", textAlign: "center", marginTop: 18 }}>
          Arch-Prism Employee Console v1.0 | © Company | Last Updated: Nov 2025
        </div>
      </form>
    </div>
  );
}
