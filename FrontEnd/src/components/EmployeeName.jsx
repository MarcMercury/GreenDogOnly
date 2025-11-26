import React from "react";
import { Link } from "react-router-dom";

export default function EmployeeName({ employee }) {
  return (
    <Link to={`/employees/${employee.id}/profile`} className="text-blue-600 hover:underline">
      {employee.firstName} {employee.lastName}
    </Link>
  );
}
