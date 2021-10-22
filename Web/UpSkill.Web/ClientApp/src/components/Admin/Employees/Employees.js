import { useState, useEffect } from "react";
import { getAllEmployees } from "../../../services/employeeService";

export default function Companies() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((employees) => {
      setEmployees(employees);
    });
  }, []);

  return (
    <div>
      <div>
        <mark>All Employees</mark> are currently{" "}
        <span className="bold-element">{employees.length}</span>
      </div>
    </div>
  );
}
