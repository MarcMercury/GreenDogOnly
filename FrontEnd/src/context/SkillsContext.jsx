import React, { createContext, useContext, useState } from "react";

const SkillsContext = createContext(null);

const initialSkills = [
  { id: "surg-anesthesia-machine-setup", category: "Surgical Nursing", name: "Anesthesia Machine setup" },
  { id: "surg-drugs", category: "Surgical Nursing", name: "Drugs" },
  { id: "surg-intubation", category: "Surgical Nursing", name: "Intubation" },
  { id: "surg-aseptic-prep", category: "Surgical Nursing", name: "Aseptic preparations" },
  { id: "surg-positioning", category: "Surgical Nursing", name: "Positioning" },
  { id: "surg-patient-monitoring", category: "Surgical Nursing", name: "Patient monitoring" },
  { id: "surg-instrument-id", category: "Surgical Nursing", name: "Instruments identification" },
  { id: "surg-instrument-setup-handling", category: "Surgical Nursing", name: "Instruments setup and handling" },
  { id: "surg-instrument-cleaning", category: "Surgical Nursing", name: "Instrument cleaning" },
  { id: "surg-sterilization-autoclave", category: "Surgical Nursing", name: "Sterilization (autoclave)" },
  { id: "surg-hospitalization", category: "Surgical Nursing", name: "Hospitalization" },
  { id: "surg-irrigation-suction", category: "Surgical Nursing", name: "Irrigation and suction" },
  { id: "surg-types-of-sutures", category: "Surgical Nursing", name: "Types of sutures" },
  { id: "surg-assisted-breathing", category: "Surgical Nursing", name: "Assisted breathing w/ anesthesia machine" },
  { id: "surg-ecg-setup", category: "Surgical Nursing", name: "ECG set up" },
  { id: "surg-identify-heart-murmurs", category: "Surgical Nursing", name: "Identify heart murmurs" },
  { id: "dent-swaddling", category: "Dental Technician", name: "Swaddling Techniques" },
  { id: "dent-charting", category: "Dental Technician", name: "Dental Charting/Abbrv." },
  { id: "dent-nad-safety-ppe", category: "Dental Technician", name: "NAD Safety and PPE" },
  { id: "dent-workspace-behavior", category: "Dental Technician", name: "Workspace/Behavioral Expectations" },
  { id: "dent-instrument-id", category: "Dental Technician", name: "Instruments (Identification)" },
  { id: "dent-instrument-maint", category: "Dental Technician", name: "Instrument/Equip Maintenance" },
  { id: "dent-identifying-pathologies", category: "Dental Technician", name: "Identifying Pathologies" },
  { id: "dent-identifying-fails", category: "Dental Technician", name: "Identifying Fails" },
  { id: "dent-hand-scaling", category: "Dental Technician", name: "Hand Scaling" },
  { id: "dent-polishing", category: "Dental Technician", name: "Polishing" },
  { id: "dent-ultrasonic-scaling", category: "Dental Technician", name: "Ultrasonic Scaling" },
  { id: "dent-time-efficiency", category: "Dental Technician", name: "Time Efficiency" },
  { id: "dent-feline-scaling", category: "Dental Technician", name: "Feline Dental Scaling" },
  { id: "rad-safety-ppe", category: "Radiology", name: "Safety protocols & PPE" },
  { id: "rad-positioning-restraint", category: "Radiology", name: "Patient positioning & restraint" },
  { id: "rad-ofa", category: "Radiology", name: "OFA rads" },
  { id: "rad-sending-reports", category: "Radiology", name: "Sending reports" },
  { id: "rad-exposure-settings", category: "Radiology", name: "Calc/obtaining exposure settings" },
  { id: "rad-handsfree", category: "Radiology", name: "Hands Free Radiology" },
  { id: "us-equipment-setup", category: "Ultrasonography", name: "Equipment & set up" },
  { id: "us-positioning-restraint", category: "Ultrasonography", name: "Patient positioning & restraint" },
  { id: "us-shaving", category: "Ultrasonography", name: "Shaving" },
  { id: "us-report-assist", category: "Ultrasonography", name: "Ultrasound Report (assist DVM)" }
];

export function SkillsProvider({ children }) {
  const [skills, setSkills] = useState(initialSkills);

  const addSkill = skill => {
    setSkills(prev => [...prev, { ...skill }]);
  };

  return (
    <SkillsContext.Provider value={{ skills, addSkill }}>
      {children}
    </SkillsContext.Provider>
  );
}

export function useSkills() {
  const ctx = useContext(SkillsContext);
  if (!ctx) throw new Error("useSkills must be used inside SkillsProvider");
  return ctx;
}
