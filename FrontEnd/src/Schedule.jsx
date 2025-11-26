import React, { useEffect, useState } from "react";
import SchedulerGrid from "./components/scheduler/SchedulerGrid";
import Button from "./components/Button";
import "./schedule.css";

export default function Schedule() {
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  useEffect(() => {
    fetch("/api/employees")
      .then(res => res.json())
      .then(data => setEmployees(data));
    fetch("/api/schedule/1")
      .then(res => res.json())
      .then(data => setShifts(data));
  }, []);

  function handleShiftUpdate(updated) {
    // TODO: Update shift via API
    alert(`Update shift for employee ${updated.employee_id}`);
  }

  return (
    <div className="schedule-root">
      <div className="page-title-bar">
        <h1>Schedule</h1>
        <div className="actions">
          <Button>Add Shift</Button>
          <Button>Auto-Fill</Button>
          <Button>Copy Last Week</Button>
          <Button>Rules ▼</Button>
          <Button>Filters</Button>
        </div>
      </div>
      <div className="week-selector">
        <Button>{"< Prev"}</Button>
        <span>Jan 14–20 2025</span>
        <Button>{"Next >"}</Button>
      </div>
      <div className="schedule-grid-wrapper">
        <SchedulerGrid employees={employees} shifts={shifts} onShiftUpdate={handleShiftUpdate} />
      </div>
      <aside className="schedule-sidebar">
        <div className="sidebar-section">
          <h2>Filters</h2>
          <div>Skill, Tier, Status</div>
        </div>
        <div className="sidebar-section">
          <h2>Shift Counter</h2>
          <div>Total hours per day/employee/week</div>
        </div>
        <div className="sidebar-section">
          <h2>Violations</h2>
          <ul>
            <li>Max Hours Exceeded</li>
            <li>Missing Required Skills</li>
            <li>License Expired</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
