import React from 'react';
import './EmployeesPositionCard.css';

function EmployeeRow() {
  return (
    <>
      <div className="rowText">
        <strong id='employee'>Lora Petrova</strong>
        <span id='position'>Junior Software Developer</span>
      </div>
      <hr />
    </>
  );
}

export default EmployeeRow;
