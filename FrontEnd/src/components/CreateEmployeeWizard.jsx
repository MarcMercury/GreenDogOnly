import { useState } from "react";
import { useEmployeeData } from "../context/EmployeeDataContext";
import "./createEmployee.css";

const blankEmployee = {
  employeeId: "",
  fullName: "",
  firstName: "",
  lastName: "",
  preferredName: "",
  email: "",
  phone: "",
  dob: "",
  zipCode: "",
  department: "",
  role: "",
  title: "",
  tier: "",
  reportsTo: "",
  location: "",
  inHouseOrRemote: "In-House",
  adpJobTitle: "",
  hireDate: "",
  type: "FT",
  status: "Active",
  daysPerWeek: 5,
  ftePercent: 1,
  latestWageChangeDate: "",
  hourlyRate: "",
  annualWages: "",
  previousWageAmount: "",
  ptoAllotment: "",
  ptoPolicyAllotment: "",
  ptoUsed: 0,
  ptoAvailable: "",
  benefitsCompleted: false,
  benefitsTracker: "",
  ceBudget: "",
  ceUsed: 0,
  ceRemaining: "",
  offerLetterCompleted: false,
  handbookSigned2025: false,
  onboardingCompleted: false,
  sexualHarassmentTrainingDate: "",
  harassmentPay: 0,
  safetyTrainingDate: "",
  backgroundCheckProcessed: false,
  emergencyContactForm2025Done: false,
  contractSent: false,
  contractSigned: false,
  approvedOrDenied: "",
  ceContractSent: false,
  ceContractSigned: false,
  immigrationAgreementSent: false,
  immigrationAgreementSigned: false,
  licensesTracked: ""
};

export default function CreateEmployeeWizard({ open, onClose }) {
  const { addEmployee } = useEmployeeData();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(blankEmployee);

  if (!open) return null;

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const next = () => setStep(s => Math.min(s + 1, 3));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.fullName) {
      form.fullName = `${form.firstName} ${form.lastName}`.trim();
    }
    addEmployee(form);
    setForm(blankEmployee);
    setStep(0);
    onClose();
  };

  return (
    <div className="cew-backdrop">
      <div className="cew-modal">
        <h2>Create New Employee</h2>
        <p className="cew-subtitle">
          Fill in the essentials now. You can always edit the full record later
          from the Employees grid.
        </p>
        <form onSubmit={handleSubmit} className="cew-form">
          {step === 0 && (
            <section>
              <h3>Identity & Structure</h3>
              <div className="cew-grid">
                <label>Employee ID<input value={form.employeeId} onChange={e => updateField("employeeId", e.target.value)} /></label>
                <label>First Name<input value={form.firstName} onChange={e => updateField("firstName", e.target.value)} /></label>
                <label>Last Name<input value={form.lastName} onChange={e => updateField("lastName", e.target.value)} /></label>
                <label>Preferred Name<input value={form.preferredName} onChange={e => updateField("preferredName", e.target.value)} /></label>
                <label>Email<input type="email" value={form.email} onChange={e => updateField("email", e.target.value)} /></label>
                <label>Phone<input value={form.phone} onChange={e => updateField("phone", e.target.value)} /></label>
                <label>Department<input value={form.department} onChange={e => updateField("department", e.target.value)} /></label>
                <label>Role<input value={form.role} onChange={e => updateField("role", e.target.value)} /></label>
                <label>Title<input value={form.title} onChange={e => updateField("title", e.target.value)} /></label>
                <label>Tier<input value={form.tier} onChange={e => updateField("tier", e.target.value)} /></label>
                <label>Reports To<input value={form.reportsTo} onChange={e => updateField("reportsTo", e.target.value)} /></label>
                <label>Location<input value={form.location} onChange={e => updateField("location", e.target.value)} /></label>
                <label>Employment Status<select value={form.employmentStatus} onChange={e => updateField("employmentStatus", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900">
                  <option>Prospect</option>
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>1099</option>
                  <option>Student</option>
                  <option>Mentee</option>
                  <option>Extern</option>
                  <option>Intern</option>
                  <option>Seasonal</option>
                  <option>Temporary</option>
                  <option>On Leave</option>
                  <option>Terminated</option>
                </select></label>
              </div>
            </section>
          )}
          {step === 1 && (
            <section>
              <h3>Employment & Compensation</h3>
              <div className="cew-grid">
                <label>In-House or Remote<select value={form.inHouseOrRemote} onChange={e => updateField("inHouseOrRemote", e.target.value)}><option>In-House</option><option>Remote</option><option>Hybrid</option></select></label>
                <label>ADP Job Title<input value={form.adpJobTitle} onChange={e => updateField("adpJobTitle", e.target.value)} /></label>
                <label>Hire Date<input type="date" value={form.hireDate} onChange={e => updateField("hireDate", e.target.value)} /></label>
                <label>Type<select value={form.type} onChange={e => updateField("type", e.target.value)}><option>FT</option><option>PT</option><option>Contractor</option></select></label>
                <label>Status<select value={form.status} onChange={e => updateField("status", e.target.value)}><option>Active</option><option>Inactive</option><option>LOA</option><option>Terminated</option></select></label>
                <label>Days Per Week<input type="number" value={form.daysPerWeek} onChange={e => updateField("daysPerWeek", Number(e.target.value))} /></label>
                <label>FTE %<input type="number" step="0.05" value={form.ftePercent} onChange={e => updateField("ftePercent", Number(e.target.value))} /></label>
                <label>Hourly Rate<input type="number" step="0.01" value={form.hourlyRate} onChange={e => updateField("hourlyRate", Number(e.target.value))} /></label>
                <label>Annual Wages<input type="number" step="0.01" value={form.annualWages} onChange={e => updateField("annualWages", Number(e.target.value))} /></label>
                <label>PTO Allotment (hrs)<input type="number" value={form.ptoAllotment} onChange={e => updateField("ptoAllotment", Number(e.target.value))} /></label>
                <label>PTO Policy Allotment<input type="number" value={form.ptoPolicyAllotment} onChange={e => updateField("ptoPolicyAllotment", Number(e.target.value))} /></label>
                <label>CE Budget $<input type="number" value={form.ceBudget} onChange={e => updateField("ceBudget", Number(e.target.value))} /></label>
              </div>
            </section>
          )}
          {step === 2 && (
            <section>
              <h3>Compliance & Documents</h3>
              <div className="cew-grid">
                <label>Benefits Completed<input type="checkbox" checked={form.benefitsCompleted} onChange={e => updateField("benefitsCompleted", e.target.checked)} /></label>
                <label>Benefits Tracker<input value={form.benefitsTracker} onChange={e => updateField("benefitsTracker", e.target.value)} /></label>
                <label>Offer Letter Completed<input type="checkbox" checked={form.offerLetterCompleted} onChange={e => updateField("offerLetterCompleted", e.target.checked)} /></label>
                <label>2025 Handbook & Protocol Signed<input type="checkbox" checked={form.handbookSigned2025} onChange={e => updateField("handbookSigned2025", e.target.checked)} /></label>
                <label>Onboarding Completed / GD Checklist<input type="checkbox" checked={form.onboardingCompleted} onChange={e => updateField("onboardingCompleted", e.target.checked)} /></label>
                <label>Sexual Harassment Training Date<input type="date" value={form.sexualHarassmentTrainingDate} onChange={e => updateField("sexualHarassmentTrainingDate", e.target.value)} /></label>
                <label>Safety Training Date<input type="date" value={form.safetyTrainingDate} onChange={e => updateField("safetyTrainingDate", e.target.value)} /></label>
                <label>Background Check Processed<input type="checkbox" checked={form.backgroundCheckProcessed} onChange={e => updateField("backgroundCheckProcessed", e.target.checked)} /></label>
                <label>2025 Emergency Contact Form Done<input type="checkbox" checked={form.emergencyContactForm2025Done} onChange={e => updateField("emergencyContactForm2025Done", e.target.checked)} /></label>
                <label>Licenses Tracked / Exp Dates<input value={form.licensesTracked} onChange={e => updateField("licensesTracked", e.target.value)} /></label>
              </div>
            </section>
          )}
          {step === 3 && (
            <section>
              <h3>Contracts</h3>
              <div className="cew-grid">
                <label>Employee / Contractor Contract Sent<input type="checkbox" checked={form.contractSent} onChange={e => updateField("contractSent", e.target.checked)} /></label>
                <label>Employee / Contractor Contract Signed<input type="checkbox" checked={form.contractSigned} onChange={e => updateField("contractSigned", e.target.checked)} /></label>
                <label>Approved or Denied<input value={form.approvedOrDenied} onChange={e => updateField("approvedOrDenied", e.target.value)} /></label>
                <label>CE Contract Sent<input type="checkbox" checked={form.ceContractSent} onChange={e => updateField("ceContractSent", e.target.checked)} /></label>
                <label>CE Contract Signed<input type="checkbox" checked={form.ceContractSigned} onChange={e => updateField("ceContractSigned", e.target.checked)} /></label>
                <label>Immigration Expense Agreement Sent<input type="checkbox" checked={form.immigrationAgreementSent} onChange={e => updateField("immigrationAgreementSent", e.target.checked)} /></label>
                <label>Immigration Expense Agreement Signed<input type="checkbox" checked={form.immigrationAgreementSigned} onChange={e => updateField("immigrationAgreementSigned", e.target.checked)} /></label>
              </div>
            </section>
          )}
          <div className="cew-footer">
            <button type="button" onClick={onClose} className="cew-btn-muted">Cancel</button>
            <div className="cew-footer-right">
              {step > 0 && (
                <button type="button" onClick={back} className="cew-btn-muted">Back</button>
              )}
              {step < 3 ? (
                <button type="button" onClick={next} className="cew-btn">Next</button>
              ) : (
                <button type="submit" className="cew-btn">Create Employee</button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
