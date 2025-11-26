import React, { useState } from "react";
import "./login.css";

export default function Login({ onLogin }) {
  const [operator, setOperator] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("admin");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (password !== "YourAdminPasswordHere") {
      setError("Incorrect password.");
      return;
    }
    localStorage.setItem("SESSION_OPERATOR", operator);
    localStorage.setItem("SESSION_MODE", mode);
    localStorage.setItem("SESSION_START", new Date().toISOString());
    if (onLogin) {
      onLogin({ operator, mode });
    }
  }

  return (
    <div className="login-wrapper">
      <form className="login-panel" onSubmit={handleLogin}>
        <div className="title">Employee Operations Console</div>

        <label>Operator Name</label>
        <input
          type="text"
          value={operator}
          onChange={e => setOperator(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <div className="mode-group">
          <label>
            <input
              type="radio"
              value="admin"
              checked={mode === "admin"}
              onChange={() => setMode("admin")}
            />
            Admin Mode
          </label>

          <label>
            <input
              type="radio"
              value="read"
              checked={mode === "read"}
              onChange={() => setMode("read")}
            />
            Read-Only Mode
          </label>
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit">Login</button>

        <div className="footer">
          v1.0.0 • © Your Company
        </div>
      </form>
    </div>
  );
}
