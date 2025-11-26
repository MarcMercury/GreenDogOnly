export function validateShift(employee, shift) {
  const errors = [];

  if (employee.status !== "Active")
    errors.push("Employee inactive");

  if (employee.max_hours && shift.duration > employee.max_hours)
    errors.push("Exceeds weekly hours");

  if (employee.required_skills) {
    const missing = employee.required_skills.filter(
      s => !employee.skills.includes(s)
    );
    if (missing.length) errors.push("Missing required skills");
  }

  if (employee.license_expired) {
    errors.push("License expired");
  }

  return errors;
}
