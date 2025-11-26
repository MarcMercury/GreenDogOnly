import { vetSkills } from "./vetSkills";

export function generateEmployees(count = 20) {
  const output = [];
  for (let i = 0; i < count; i++) {
    const full = `Employee ${i + 1}`;
    output.push({
      id: i + 1,
      full_name: full,
      first_name: "Employee",
      last_name: String(i + 1),
      status: "Active",
      employment_type: "FT",
      adp_job_title: "Veterinary Assistant",
      hire_date: "2023-01-01",
      annual_wages: 55000,
      skills: vetSkills.slice(0, 4).map(s => ({ skill: s.name }))
    });
  }
  return output;
}

export function generateShifts(employees) {
  const shifts = [];
  employees.forEach(e => {
    shifts.push({
      id: e.id,
      employee_id: e.id,
      date: 1,
      start: "08:00",
      end: "16:00"
    });
  });
  return shifts;
}
