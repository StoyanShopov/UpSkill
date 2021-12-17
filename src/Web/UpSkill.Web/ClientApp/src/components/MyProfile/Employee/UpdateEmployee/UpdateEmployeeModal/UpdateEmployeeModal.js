import UpdateEmployee from '../UpdateEmployee';

function UpdateEmployeeModal({ closeUpdateEmployeeModal }) {
  return (
    <div className="detailsModal-background">
      <div className="update-course-wrapper">
        <UpdateEmployee closeModal={closeUpdateEmployeeModal}></UpdateEmployee>{' '}
      </div>
    </div>
  );
}
export default UpdateEmployeeModal;
