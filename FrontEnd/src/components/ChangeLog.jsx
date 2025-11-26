import React, { useState } from "react";

const MOCK_CHANGES = [
  {
    id: 1,
    employeeId: "GD-0001",
    field: "email",
    oldValue: "sam@oldmail.com",
    newValue: "sam@example.com",
    changedBy: "marc.h.mercury@gmail.com",
    changedAt: "2025-11-26 09:12",
  },
  {
    id: 2,
    employeeId: "GD-0001",
    field: "title",
    oldValue: "Vet Tech I",
    newValue: "Vet Tech II",
    changedBy: "marc.h.mercury@gmail.com",
    changedAt: "2025-11-26 09:15",
  },
];

export default function ChangeLog() {
  const [changes] = useState(MOCK_CHANGES);
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 8 }}>Employee Change Log</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
        <thead>
          <tr style={{ background: "#F5F6FA" }}>
            <th style={{ padding: 8, textAlign: "left", color: "#23272F", fontWeight: 700, fontSize: 15, background: "#F5F6FA", borderBottom: "1px solid #E5E7EB" }}>Employee ID</th>
            <th style={{ padding: 8, textAlign: "left", color: "#23272F", fontWeight: 700, fontSize: 15, background: "#F5F6FA", borderBottom: "1px solid #E5E7EB" }}>Field</th>
            <th style={{ padding: 8, textAlign: "left", color: "#23272F", fontWeight: 700, fontSize: 15, background: "#F5F6FA", borderBottom: "1px solid #E5E7EB" }}>Old Value</th>
            <th style={{ padding: 8, textAlign: "left", color: "#23272F", fontWeight: 700, fontSize: 15, background: "#F5F6FA", borderBottom: "1px solid #E5E7EB" }}>New Value</th>
            <th style={{ padding: 8, textAlign: "left", color: "#23272F", fontWeight: 700, fontSize: 15, background: "#F5F6FA", borderBottom: "1px solid #E5E7EB" }}>Changed By</th>
            <th style={{ padding: 8, textAlign: "left", color: "#23272F", fontWeight: 700, fontSize: 15, background: "#F5F6FA", borderBottom: "1px solid #E5E7EB" }}>Changed At</th>
          </tr>
        </thead>
        <tbody>
          {changes.map(change => (
            <tr key={change.id} style={{ background: "#F8FAFC" }}>
              <td style={{ padding: 8, color: "#23272F", fontSize: 15, fontWeight: 500, background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>{change.employeeId}</td>
              <td style={{ padding: 8, color: "#23272F", fontSize: 15, fontWeight: 500, background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>{change.field}</td>
              <td style={{ padding: 8, color: "#23272F", fontSize: 15, fontWeight: 500, background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>{change.oldValue}</td>
              <td style={{ padding: 8, color: "#23272F", fontSize: 15, fontWeight: 500, background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>{change.newValue}</td>
              <td style={{ padding: 8, color: "#23272F", fontSize: 15, fontWeight: 500, background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>{change.changedBy}</td>
              <td style={{ padding: 8, color: "#23272F", fontSize: 15, fontWeight: 500, background: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>{change.changedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
