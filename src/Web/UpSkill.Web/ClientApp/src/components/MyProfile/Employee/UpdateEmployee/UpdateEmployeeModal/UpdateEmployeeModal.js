import UpdateEmployee from '../UpdateEmployee';

import './UpdateEmployeeModal.css'

function UpdateEmployeeModal({ closeUpdateEmployeeModal }) {
  return (
    <div className="detailsModal-background-employee">
      <div className="update-employee-wrapper">
        <UpdateEmployee closeModal={closeUpdateEmployeeModal}></UpdateEmployee>{' '}
      </div>
    </div>
  );
}
export default UpdateEmployeeModal;
