import React, {useEffect, useState} from 'react';
import EmployeeEmailInfo from './EmployeeEmailInfo/EmployeeEmailInfo';
import AddEmployeePopup from './AddEmployee/AddEmployee';

import './Employees.css';


export default function Employees() {
  const [addEmployeePopup, setAddEmployeePopup] = useState(false);
  
  return (
      <div className="content w-100 main-content">
          <EmployeeEmailInfo onAddEmployee={setAddEmployeePopup} />
          <AddEmployeePopup trigger={addEmployeePopup} onAddEmployee={setAddEmployeePopup}/>           
      </div>
    );
  }

