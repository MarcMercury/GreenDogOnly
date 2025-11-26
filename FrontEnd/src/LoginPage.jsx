import React, { useState } from "react";
import "./login.css";

export default function LoginPage({ onLogin }) {
  const [operator, setOperator] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("admin");
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!password) {
      setError("Enter the admin password to unlock the console.");
      return;
    }
    setError("");
    if (onLogin) {
      onLogin({ operator, mode });
    }
  };

  return (
    <div className="cr-root">
      <div className="cr-bg-glow" />

      <div className="cr-shell">
        {/* Logo + wordmark */}
        <div className="cr-brand" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
          <div className="cr-logo-wrap" style={{ width: 160, height: 160, borderRadius: 32, background: "rgba(255,255,255,0.04)", boxShadow: "0 0 64px #FFC85744", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/Crateso%20logo.png" alt="Crateso" className="cr-logo-img" style={{ width: 128, height: 128, objectFit: "contain", filter: "drop-shadow(0 0 40px #FFC85788)" }} />
          </div>
          <div className="cr-brand-text" style={{ textAlign: "center", marginTop: 18 }}>
            <div className="cr-brand-title" style={{ fontSize: 38, fontWeight: 700, color: "#F5EEDC", textShadow: "0 0 14px rgba(255,200,87,0.2)", letterSpacing: "0.12em", marginBottom: 4 }}>CRATESO</div>
            <div className="cr-brand-subtitle" style={{ fontSize: 20, color: "#C8C4B8", fontWeight: 600, textAlign: "center" }}>Make Them Think</div>
          </div>
        </div>

        {/* Main sign-in card */}
        <div className="cr-card" style={{ maxWidth: 340, margin: "0 auto", boxShadow: "0 8px 32px rgba(0,0,0,0.32)", borderRadius: 22 }}>
          <div className="cr-card-header" style={{ textAlign: "center" }}>
            <h1>Sign in</h1>
            <p>Log into the console as the on-duty operator.</p>
          </div>

          {/* 🔴 keep your existing bindings + onSubmit handler */}
          <form className="cr-form" onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 300, margin: "0 auto" }}>
            <label className="cr-label" style={{ fontSize: 15, color: "#F5EEDC", marginBottom: 10 }}>
              Operator Name
              <input
                className="cr-input"
                value={operator}
                onChange={e => setOperator(e.target.value)}
                placeholder="you@example.com"
                style={{ fontSize: 15, marginTop: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,200,87,0.25)", color: "#F5EEDC", borderRadius: 10, height: 38, padding: "8px 12px" }}
              />
            </label>
            <label className="cr-label" style={{ fontSize: 15, color: "#F5EEDC", marginBottom: 10 }}>
              Password
              <input
                className="cr-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                style={{ fontSize: 15, marginTop: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,200,87,0.25)", color: "#F5EEDC", borderRadius: 10, height: 38, padding: "8px 12px" }}
              />
            </label>

                    <div className="cr-mode-row" style={{ marginTop: 12, marginBottom: 10, display: "flex", alignItems: "center", gap: 18 }}>
                      <span className="cr-label-text" style={{ fontSize: 14, color: "#C8C4B8", marginRight: 8 }}>Mode</span>
                      <span className="cr-mode-pill" style={{ background: "rgba(255,200,87,0.08)", border: "1px solid #FFC857", padding: "6px 18px", borderRadius: 14 }}>
                        <label className="cr-mode-option" style={{ color: "#F5EEDC", fontWeight: 500, fontSize: 15, marginRight: 12 }}>
                          <input
                            type="radio"
                            checked={mode === "admin"}
                            onChange={() => setMode("admin")}
                            style={{ accentColor: "#FFC857", marginRight: 6 }}
                          />
                          Admin
                        </label>
                        <label className="cr-mode-option" style={{ color: "#F5EEDC", fontWeight: 500, fontSize: 15 }}>
                          <input
                            type="radio"
                            checked={mode === "readonly"}
                            onChange={() => setMode("readonly")}
                            style={{ accentColor: "#FFC857", marginRight: 6 }}
                          />
                          Read-only
                        </label>
                      </span>
                    </div>

                    {error && <div className="cr-error" style={{ textAlign: "center", marginBottom: 10, color: "#F87171" }}>{error}</div>}

                    <button className="cr-btn-primary" type="submit" style={{ width: 180, fontSize: 18, margin: "16px auto 0 auto", display: "block", boxShadow: "0 0 16px 0 #FFC85788", background: "linear-gradient(90deg, #FFC857, #FF6B35)", color: "#111827", borderRadius: 50, padding: "10px 0", fontWeight: 600 }}>Sign In</button>
                  </form>

                  <div className="cr-footline" style={{ textAlign: "center", marginTop: 22, color: "#9CA3AF", fontSize: 13, opacity: 0.7 }}>
                    v1.0.0 • Crateso • Sessions are logged by operator name.
                  </div>
          </div>
        </div>
      </div>
        );
    }
