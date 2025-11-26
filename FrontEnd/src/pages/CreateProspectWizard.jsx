import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProspectWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    desiredRole: "",
    source: "",
    notes: "",
    employmentStatus: "Prospect"
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Replace with real API call
    fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).then(() => navigate("/recruiting"));
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-slate-950/40 rounded-2xl shadow ring-1 ring-slate-800">
      <h2 className="text-xl font-semibold text-slate-50 mb-4">Create Prospect</h2>
      {step === 1 && (
        <div className="space-y-4">
          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900" />
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900" />
          <button type="button" className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600" onClick={() => setStep(2)}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <input name="desiredRole" value={form.desiredRole} onChange={handleChange} placeholder="Desired Role" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900" />
          <input name="source" value={form.source} onChange={handleChange} placeholder="Source (Referral, Indeed, etc.)" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900" />
          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900" />
          <button type="button" className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600" onClick={() => setStep(1)}>Back</button>
          <button type="submit" className="rounded-xl bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600">Create Prospect</button>
        </div>
      )}
    </form>
  );
}
