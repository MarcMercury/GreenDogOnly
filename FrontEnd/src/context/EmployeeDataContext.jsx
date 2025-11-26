import React, { createContext, useContext, useState } from "react";

const EmployeeDataContext = createContext(null);

const initialEmployees = [
  {
    id: 1,
    employeeId: "GD-0001",
    fullName: "Sam Example",
    firstName: "Sam",
    lastName: "Example",
    preferredName: "Sam",
    email: "sam@example.com",
    phone: "555-123-4567",
    dob: "1990-01-01",
    zipCode: "11377",
    department: "Medical",
    role: "Veterinary Technician",
    title: "Vet Tech II",
    tier: "Tier 2",
    reportsTo: "Dr. Rivera",
    location: "Main Clinic",
    inHouseOrRemote: "In-House",
    adpJobTitle: "Veterinary Technician",
    hireDate: "2022-03-01",
    type: "FT",
    status: "Active",
    daysPerWeek: 5,
    ftePercent: 1.0,
    latestWageChangeDate: "2024-01-01",
    hourlyRate: 32.5,
    annualWages: 67600,
    previousWageAmount: 30.0,
    ptoAllotment: 80,
    ptoPolicyAllotment: 80,
    ptoUsed: 12,
    ptoAvailable: 68,
    benefitsCompleted: true,
    benefitsTracker: "Medical/Dental/Vision",
    ceBudget: 1000,
    ceUsed: 200,
    ceRemaining: 800,
    offerLetterCompleted: true,
    handbookSigned2025: true,
    onboardingCompleted: true,
    sexualHarassmentTrainingDate: "2024-02-15",
    harassmentPay: 0,
    safetyTrainingDate: "2024-03-01",
    backgroundCheckProcessed: true,
    emergencyContactForm2025Done: true,
    contractSent: true,
    contractSigned: true,
    approvedOrDenied: "Approved",
    ceContractSent: true,
    ceContractSigned: true,
    immigrationAgreementSent: false,
    immigrationAgreementSigned: false,
    licensesTracked: "LVT – exp 2026-04-12",
    skillRatings: {
      "surg-anesthesia-machine-setup": 2,
      "dent-dental-charting": 3
    }
  }
];

export function EmployeeDataProvider({ children }) {
  const [employees, setEmployees] = useState(initialEmployees);

  const updateEmployee = (id, updates) => {
    setEmployees(prev =>
      prev.map(e => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  const addEmployee = emp => {
    const nextId = Date.now();
    setEmployees(prev => [...prev, { ...emp, id: nextId }]);
  };

  return (
    <EmployeeDataContext.Provider
      value={{ employees, updateEmployee, addEmployee }}
    >
      {children}
    </EmployeeDataContext.Provider>
  );
}

export function useEmployeeData() {
  const ctx = useContext(EmployeeDataContext);
  if (!ctx) throw new Error("useEmployeeData must be used inside provider");
  return ctx;
}
