import React from "react";
import { useEmployeeData } from "../context/EmployeeDataContext";
import EmployeeName from "./EmployeeName";

export default function EmployeeDirectory() {
  const { employees } = useEmployeeData();
  return (
    <div style={{ padding: '24px 16px 0 16px', maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8, color: '#181C2A', fontWeight: 700, fontSize: 28 }}>Employee Directory</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8, background: '#F8FAFC', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <thead>
          <tr style={{ background: '#F5F6FA' }}>
            <th style={{ padding: 12, textAlign: 'left', color: '#181C2A', fontWeight: 700, fontSize: 16, borderBottom: '1px solid #E5E7EB' }}>Name</th>
            <th style={{ padding: 12, textAlign: 'left', color: '#181C2A', fontWeight: 700, fontSize: 16, borderBottom: '1px solid #E5E7EB' }}>Email</th>
            <th style={{ padding: 12, textAlign: 'left', color: '#181C2A', fontWeight: 700, fontSize: 16, borderBottom: '1px solid #E5E7EB' }}>Title</th>
            <th style={{ padding: 12, textAlign: 'left', color: '#181C2A', fontWeight: 700, fontSize: 16, borderBottom: '1px solid #E5E7EB' }}>Reports To</th>
            <th style={{ padding: 12, textAlign: 'left', color: '#181C2A', fontWeight: 700, fontSize: 16, borderBottom: '1px solid #E5E7EB' }}>Employment Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, i) => (
            <tr key={emp.id} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F3F4F6' }}>
              <td style={{ padding: 12, color: '#181C2A', fontSize: 15, fontWeight: 500 }}><EmployeeName employee={emp} /></td>
              <td style={{ padding: 12, color: '#181C2A', fontSize: 15 }}>{emp.email}</td>
              <td style={{ padding: 12, color: '#181C2A', fontSize: 15 }}>{emp.title}</td>
              <td style={{ padding: 12, color: '#181C2A', fontSize: 15 }}>{emp.reportsTo}</td>
              <td style={{ padding: 12 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 12, background: '#F5F6FA', padding: '2px 10px', fontSize: 13, fontWeight: 600, color: '#181C2A' }}>
                  {emp.employmentStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
