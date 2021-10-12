import Courses from "./Courses/Courses";
import Companies from "./Companies/Companies"
import Employees from "./Employees/Employees"

export default function Admin() {
  return (     
        <ul className="list-group">
        <li className="list-group-item"><Courses /></li>
        <li className="list-group-item"><Companies /></li>        
        <li className="list-group-item"><Employees /></li>
        <li className="list-group-item bold-element">To Do Revenue</li>
      </ul>   
  );
}
