import React from "react";

export default function PipelineSummary({ prospects }) {
  const byRole = prospects.reduce((acc, p) => {
    const role = p.desiredRole || "Unassigned";
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  const entries = Object.entries(byRole);
  if (!entries.length) return null;

  return (
    <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
      {entries.map(([role, count]) => (
        <div key={role} className="rounded-2xl bg-slate-950/60 px-4 py-3 ring-1 ring-slate-800">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">{role}</div>
          <div className="mt-1 text-2xl font-semibold text-slate-50">{count}</div>
          <div className="text-xs text-slate-500">Prospects in pipeline</div>
        </div>
      ))}
    </div>
  );
}
