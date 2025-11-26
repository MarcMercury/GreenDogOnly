import { useState } from "react";
import ShiftBlock from "./ShiftBlock";
import React from "react";

export default function SchedulerGrid({ employees, shifts, onShiftUpdate }) {
  const [dragged, setDragged] = useState(null);

  function onDragStart(e, shift) {
    setDragged(shift);
  }

  function onDrop(e, employeeId, date) {
    if (!dragged) return;
    const updated = {
      ...dragged,
      employee_id: employeeId,
      date
    };
    onShiftUpdate(updated);
    setDragged(null);
  }

  function renderCell(employee, date) {
    const shift = shifts.find(
      s => s.employee_id === employee.id && s.date === date
    );
    return (
      <td
        onDragOver={e => e.preventDefault()}
        onDrop={e => onDrop(e, employee.id, date)}
        style={{
          width: 140,
          height: 60,
          border: "1px solid var(--border)",
          verticalAlign: "top",
          padding: 4,
          background: "#fff"
        }}
      >
        {shift && (
          <ShiftBlock
            shift={shift}
            onDrag={onDragStart}
            onResize={() => {}}
          />
        )}
      </td>
    );
  }

  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <table style={{ borderCollapse: "collapse", width: "100%", marginTop: 8 }}>
      <thead>
        <tr>
          <th style={{ width: 200, color: "#23272F", fontWeight: 700, fontSize: 15, background: "#F5F6FA", borderBottom: "1px solid #E5E7EB" }}>Employee</th>
          {week.map(d => (
            <th key={d} style={{ color: "#23272F", fontWeight: 700, fontSize: 15, background: "#F5F6FA", borderBottom: "1px solid #E5E7EB" }}>{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td style={{ padding: 8, background: "#fafafa" }}>
              <b>{emp.full_name}</b>
              <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>
                {emp.adp_job_title}
              </div>
            </td>
            {week.map((d, i) =>
              renderCell(emp, i + 1)
            )}
          </tr>
        ))}
      </tbody>
        <tbody>
          {shifts.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#F8FAFC" : "#F3F4F6" }}>
              <td style={{ width: 200, color: "#23272F", fontSize: 15, fontWeight: 500, background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>{row.employee}</td>
              {week.map((d, idx) => (
                <td key={d} style={{ width: 140, color: "#23272F", fontSize: 15, fontWeight: 500, background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>{row[d]}</td>
              ))}
            </tr>
          ))}
        </tbody>
    </table>
  );
}
