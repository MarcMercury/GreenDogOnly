

import { useState } from "react";

export default function DataGrid({ columns, rows, onRowClick }) {
  const [sort, setSort] = useState({ column: null, direction: "asc" });

  function sortRowData(col) {
    const direction = sort.direction === "asc" ? "desc" : "asc";
    setSort({ column: col, direction });
    rows.sort((a, b) => {
      if (!a[col]) return 1;
      if (!b[col]) return -1;
      return direction === "asc"
        ? String(a[col]).localeCompare(String(b[col]))
        : String(b[col]).localeCompare(String(a[col]));
    });
  }

  return (
    <div className="cr-data-pane" style={{ background: "rgba(255,255,255,0.04)", borderRadius: 18, border: "1px solid rgba(255,200,87,0.15)", backdropFilter: "blur(12px)", boxShadow: "0 8px 18px rgba(0,0,0,0.35)", padding: 0, marginLeft: 0 }}>
      <table className="cr-table" style={{ width: "100%", borderRadius: 18, overflow: "hidden" }}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={col}
                onClick={() => sortRowData(col)}
                className={idx === 0 ? "cr-sticky-col" : idx === 1 ? "cr-sticky-col-2" : ""}
                style={{
                  cursor: "pointer",
                  color: "#23272F",
                  fontWeight: 700,
                  fontSize: 15,
                  background: "#F5F6FA",
                  borderBottom: "1px solid #E5E7EB",
                  padding: "0 12px",
                  position: "sticky",
                  top: 0,
                  zIndex: 10
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
            {rowData.map((row, i) => (
              <tr key={i} className="cr-table-row" style={{ background: i % 2 === 0 ? "#F8FAFC" : "#F3F4F6" }}>
                {columns.map((col, idx) => (
                  <td
                    key={col}
                    className={idx === 0 ? "cr-sticky-col" : idx === 1 ? "cr-sticky-col-2" : ""}
                    style={{
                      color: "#23272F",
                      fontSize: 15,
                      fontWeight: 500,
                      background: "transparent",
                      borderBottom: "1px solid #E5E7EB",
                      padding: "0 12px"
                    }}
                  >
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
      </table>
    </div>
  );
}
