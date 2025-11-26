import React from "react";
import "./dashboard.css";

export default function Dashboard({ operator }) {
  return (
    <div className="dashboard-root">
      <div style={{color: 'red', fontWeight: 'bold', fontSize: 24, margin: 24}}>DASHBOARD LOADED: If you see this, React is rendering after login.</div>
      <nav className="top-nav">
        <div className="logo">LOGO</div>
        <div className="app-title">Employee Ops Console</div>
        <div className="operator">Operator: {operator}</div>
        <button className="logout">Logout</button>
      </nav>
      <div className="main-layout">
        <aside className="sidebar">
          <ul>
            <li className="active">Dashboard</li>
            <li>Employees</li>
            <li>Schedule</li>
            <li>Skills</li>
            <li>Attendance</li>
            <li>News Feed</li>
          </ul>
        </aside>
        <main className="main-area">
          <h1 className="page-title">Dashboard</h1>
          <div className="metrics-row">
            <div className="metric-card">Active Employees</div>
            <div className="metric-card">Skills Gaps</div>
            <div className="metric-card">Today's Attendance</div>
            <div className="metric-card">Upcoming Licenses</div>
          </div>
          <div className="main-grid">
            <div className="panel">Employees Needing Review</div>
            <div className="panel">Schedule Conflicts</div>
            <div className="panel">Recent Changes</div>
            <div className="panel">Role Skill Coverage Map</div>
          </div>
        </main>
      </div>
    </div>
  );
}
