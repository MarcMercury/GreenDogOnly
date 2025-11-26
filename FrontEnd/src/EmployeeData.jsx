
import React, { useState } from "react";
import Button from "./components/Button";
import CreateEmployeeWizard from "./components/CreateEmployeeWizard";
import { useEmployeeData } from "./context/EmployeeDataContext";
import "./employeeData.css";

const columns = [
  { key: "edit", label: "Edit" },
  { key: "fullName", label: "Full Name" },
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "preferredName", label: "Preferred Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "dob", label: "DOB" },
  { key: "zipCode", label: "ZIP CODE" },
  { key: "department", label: "Department" },
  { key: "role", label: "Role" },
  { key: "title", label: "Title" },
  { key: "tier", label: "Tier" },
  { key: "reportsTo", label: "Reports To" },
  { key: "location", label: "Location" },
  { key: "inHouseOrRemote", label: "In-House or Remote" },
  { key: "adpJobTitle", label: "ADP Job Title" },
  { key: "hireDate", label: "Hire Date" },
  { key: "type", label: "Type" },
  { key: "status", label: "Status" },
  { key: "daysPerWeek", label: "Days Per Week" },
  { key: "ftePercent", label: "FTE %" },
  { key: "latestWageChangeDate", label: "Latest Wage Change Date" },
  { key: "hourlyRate", label: "Hourly Rate" },
  { key: "annualWages", label: "Annual Wages" },
  { key: "previousWageAmount", label: "Previous Wage Amount" },
  { key: "ptoAllotment", label: "PTO Allotment" },
  { key: "ptoPolicyAllotment", label: "PTO Policy Allotment" },
  { key: "ptoUsed", label: "PTO Used" },
  { key: "ptoAvailable", label: "PTO Available" },
  { key: "benefitsCompleted", label: "Benefits Completed" },
  { key: "benefitsTracker", label: "Benefits Tracker" },
  { key: "ceBudget", label: "CE Budget $" },
  { key: "ceUsed", label: "CE Used" },
  { key: "ceRemaining", label: "CE Remaining" },
  { key: "offerLetterCompleted", label: "Offer Letter COMPLETED" },
  { key: "handbookSigned2025", label: "2025 Handbook, Content Release, Workplace Liability, HR Pamphlets, CPR Protocol Signed" },
  { key: "onboardingCompleted", label: "Onboarding Completed / Green Dog Recruiting & Onboarding Checklist" },
  { key: "sexualHarassmentTrainingDate", label: "Sexual Harassment Training Date" },
  { key: "harassmentPay", label: "Harassment Pay" },
  { key: "safetyTrainingDate", label: "Safety Training Date" },
  { key: "backgroundCheckProcessed", label: "Background Check Processed" },
  { key: "emergencyContactForm2025Done", label: "2025 Emergency Contact Info Form Done" },
  { key: "contractSent", label: "Employee / Contractor Contract Sent" },
  { key: "contractSigned", label: "Employee / Contractor Contract Signed" },
  { key: "approvedOrDenied", label: "Approved or Denied List" },
  { key: "ceContractSent", label: "Continuing Education Contract Sent" },
  { key: "ceContractSigned", label: "Continuing Education Contract Signed" },
  { key: "immigrationAgreementSent", label: "Immigration Expense Agreement Sent" },
  { key: "immigrationAgreementSigned", label: "Immigration Expense Agreement Signed" },
  { key: "licensesTracked", label: "Licenses Tracked / GD - Licenses and Exp Dates" }
];

export default function EmployeeData() {
  const { employees, updateEmployee } = useEmployeeData();
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});
  const [wizardOpen, setWizardOpen] = useState(false);

  const handleEdit = emp => {
    setEditingId(emp.id);
    setDraft(emp);
  };
  const handleCancel = () => {
    setEditingId(null);
    setDraft({});
  };
  const handleSave = () => {
    updateEmployee(editingId, draft);
    setEditingId(null);
    setDraft({});
  };
  const handleDraftChange = (key, value) => {
    setDraft(prev => ({ ...prev, [key]: value }));
  };

  const handleDownloadTemplate = () => {
    const headerLabels = columns.map(c => `"${c.label.replace(/"/g, '""')}"`);
    const csv = headerLabels.join(",") + "\n";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "employee_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="employee-data-root">
      <div className="page-title-bar">
        <h1>Employee Data</h1>
        <div className="actions">
          <Button onClick={() => setWizardOpen(true)}>Create Employee</Button>
          <Button>Upload CSV</Button>
          <Button onClick={handleDownloadTemplate}>Download Template</Button>
          <Button>Filter</Button>
          <Button>Columns ▼</Button>
        </div>
      </div>
      <CreateEmployeeWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
      <div className="data-grid-wrapper">
        <div style={{overflowX: "auto", overflowY: "auto", maxHeight: "70vh"}}>
          <table className="emp-table emp-table-grid">
            <thead>
              <tr>
                {columns.map((col, index) => {
                  // Edit column width must match CSS min/max-width
                  const editColWidth = 70;
                  const nameColWidth = 160;
                  let style = {};
                  if (index === 0) {
                    style = { zIndex: 4, position: "sticky", left: 0, minWidth: editColWidth, maxWidth: editColWidth, background: "#f7f9fc" };
                  } else if (index === 1) {
                    style = { zIndex: 3, position: "sticky", left: editColWidth, minWidth: nameColWidth, maxWidth: nameColWidth, background: "#f7f9fc" };
                  }
                  return (
                    <th
                      key={col.key}
                      className={
                        "emp-th" +
                        (index === 0 ? " emp-th-sticky-left emp-th-edit" : "") +
                        (index === 1 ? " emp-th-sticky-left emp-th-name" : "")
                      }
                      style={style}
                    >
                      {col.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => {
                const isEditing = editingId === emp.id;
                const rowData = isEditing ? draft : emp;
                return (
                  <tr key={emp.id}>
                    {columns.map((col, index) => {
                      const editColWidth = 70;
                      const nameColWidth = 160;
                      let style = {};
                      if (index === 0) {
                        style = { zIndex: 4, position: "sticky", left: 0, minWidth: editColWidth, maxWidth: editColWidth, background: "#f7f9fc" };
                      } else if (index === 1) {
                        style = { zIndex: 3, position: "sticky", left: editColWidth, minWidth: nameColWidth, maxWidth: nameColWidth, background: "#f7f9fc" };
                      }
                      return (
                        <td
                          key={col.key}
                          className={
                            "emp-td" +
                            (index === 0 ? " emp-td-sticky-left emp-td-edit" : "") +
                            (index === 1 ? " emp-td-sticky-left emp-td-name" : "")
                          }
                          style={style}
                        >
                          {col.key === "edit" ? (
                            isEditing ? (
                              <>
                                <Button onClick={handleSave}>Save</Button>
                                <Button onClick={handleCancel}>Cancel</Button>
                              </>
                            ) : (
                              <Button onClick={() => handleEdit(emp)}>Edit</Button>
                            )
                          ) : col.key === "fullName" ? (
                            <button
                              className="emp-name-link"
                              type="button"
                              onClick={() => {}}
                            >
                              {rowData.fullName}
                            </button>
                          ) : isEditing ? (
                            <input
                              className="emp-cell-input"
                              value={rowData[col.key] ?? ""}
                              onChange={e => handleDraftChange(col.key, e.target.value)}
                            />
                          ) : (
                            String(rowData[col.key] ?? "")
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
