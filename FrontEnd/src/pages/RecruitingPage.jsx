import React, { useEffect, useState } from "react";
import PipelineSummary from "../components/recruiting/PipelineSummary";
// import { useNavigate } from "react-router-dom";

export default function RecruitingPage() {
  const [prospects, setProspects] = useState([
    {
      id: "p1",
      firstName: "Sam",
      lastName: "Candidate",
      email: "sam@example.com",
      phone: "555-123-4567",
      employmentStatus: "Prospect",
      desiredRole: "Veterinary Assistant",
      source: "Indeed",
      notes: "Has ER experience"
    },
    {
      id: "p2",
      firstName: "Alex",
      lastName: "Prospect",
      email: "alex@demo.com",
      phone: "555-987-6543",
      employmentStatus: "Prospect",
      desiredRole: "CSR",
      source: "Referral",
      notes: "Strong customer service"
    }
  ]);
  const [roleFilter, setRoleFilter] = useState(null);

  const filtered = roleFilter
    ? prospects.filter(p => p.desiredRole === roleFilter)
    : prospects;

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">Recruiting</h1>
          <p className="text-sm text-slate-400">Track prospects and hiring pipeline.</p>
        </div>
        <a
          href="#"
          className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          onClick={() => window.location.hash = "#create-prospect"}
        >
          Create Prospect
        </a>
      </header>
      <PipelineSummary prospects={prospects} />
      <section className="rounded-2xl bg-slate-950/40 p-4 shadow-sm ring-1 ring-slate-800">
        <div className="mb-4 flex items-center gap-3">
          {/* role filter + search */}
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/40">
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-300">Name</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-300">Role</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-300">Source</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-300">Email</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-300">Status</th>
              <th className="px-4 py-2 text-right text-xs font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-slate-800/60">
                <td className="px-4 py-2 text-sm text-slate-50">{p.firstName} {p.lastName}</td>
                <td className="px-4 py-2 text-sm text-slate-200">{p.desiredRole ?? "—"}</td>
                <td className="px-4 py-2 text-sm text-slate-200">{p.source ?? "—"}</td>
                <td className="px-4 py-2 text-sm text-slate-200">{p.email}</td>
                <td className="px-4 py-2 text-sm"><span className="rounded-full bg-amber-100/10 px-2 py-0.5 text-xs font-medium text-amber-300">{p.employmentStatus}</span></td>
                <td className="px-4 py-2 text-right text-sm">{/* View / Edit / Convert buttons */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
