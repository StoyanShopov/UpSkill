import { getAllEmployees } from "../../../services/employeeService";

export default function Companies() {
  
    const allEmployees = getAllEmployees();
    console.log(allEmployees);
  return (       
    <div>
      <div>
        <mark>All Employees</mark> are currently{" "}
        <span className="bold-element">{allEmployees.length}</span>
      </div>
    </div>
  );
}