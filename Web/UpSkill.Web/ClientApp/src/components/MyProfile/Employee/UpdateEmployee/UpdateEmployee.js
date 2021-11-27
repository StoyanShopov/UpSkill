import React, { useState, useEffect } from 'react';

import { updateEmployee } from '../../../../services/employeeService';
import { enableBodyScroll } from '../../../../utils/utils';

import UserProfilePic from '../../../../assets/userProfilePic.png';

import './UpdateEmployee.css';
// id, firstName, lastName, file, description,email
export default function UpdateEmployee({
  closeModal,
  trigger,
  employeeDetails,
}) {
  const [description, setDescription] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [file, setFile] = useState({});
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const test = localStorage.getItem('ID');

  let handleValidation = () => {
    let fields = {
      description,
      firstName,
      lastName,
      file,
      id,
    };
    let errorsValidation = {};
    let formIsValid = true;

    if (!fields['description']) {
      formIsValid = false;
      errorsValidation['description'] = 'Cannot be empty';
    }

    if (!fields['file']) {
      formIsValid = false;
      errorsValidation['file'] = 'Cannot be empty';
    }

    if (!fields['firstName']) {
      formIsValid = false;
      errorsValidation['firstName'] = 'Cannot be empty';
    }

    if (!fields['lastName']) {
      formIsValid = false;
      errorsValidation['lastName'] = 'Cannot be empty';
    }

    setErrors(errorsValidation);
    return formIsValid;
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    setId(localStorage.getItem('ID'));
    setFirstName(localStorage.getItem('firstName')); //FirstName?
    setLastName(localStorage.getItem('lastName'));
    setEmail(localStorage.getItem('email'));
    setDescription(localStorage.getItem('description'));
  }, [test]);

  function submitEditCoach(e) {
    e.preventDefault();
    if (handleValidation()) {
      updateEmployee(employeeDetails.id, firstName, lastName, description, file)
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            setSuccess(true);
            setFirstName('');
            setLastName('');
            setDescription('');
            localStorage.removeItem('ID');
            localStorage.removeItem('firstName');
            localStorage.removeItem('lastName');
            localStorage.removeItem('description');
          }
        })
        .catch(() => setSuccess(false));
    } else {
      setSuccess(false);
    }
  }

  function closePopup() {
    enableBodyScroll();
    closeModal(false);
    setSuccess(false);
  }

  return true ? ( // change 'true' with 'trigger'
    <div className="deleteModal-background">
      <div className="updateCoach-popup">
        <div className="updateCoach-popup-createCoach-inner">
          <div className="updateCoach-popup-Header">
            <div className="closebtn d-flex justify-content-end pt-2 pe-2">
              <button onClick={(e) => closePopup()} className="closebtn btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="updateCoach-popup-Title pb-2">
              <h4>Personal Information</h4>
            </div>
          </div>

          <form onSubmit={(e) => submitEditCoach(e)}>
            <div className="updateCoach-Content px-5 m-5">
              <div className="updateCoach-Content-fullname px-5 m-3">
                {success && (
                  <span style={{ color: 'green', marginBottom: '0px' }}>
                    Successfully updated
                  </span>
                )}
                <input
                  type="text"
                  placeholder="First Name*"
                  className="updateCoach-Content-input w-100 p-2"
                  value={firstName}
                  onChange={onChangeFirstName}
                />
                <p style={{ color: 'red' }}>{errors['coachFirstName']}</p>
              </div>

              <div className="updateCoach-Content-fullname px-5 m-3">
                <input
                  type="text"
                  placeholder="Last Name*"
                  className="updateCoach-Content-input w-100 p-2"
                  value={lastName}
                  onChange={onChangeLastName}
                />
                <p style={{ color: 'red' }}>{errors['coachLastName']}</p>
              </div>

              <div className="updateCoach-Content-fullname px-5 m-3">
                <input
                  disabled
                  type="text"
                  placeholder="Email*" //{email}
                  className="updateCoach-Content-input w-100 p-2"
                  value={email}
                  onChange={onChangeLastName}
                />
                <p style={{ color: 'red' }}>{errors['email']}</p>
              </div>

              <div className="updateCoach-Content-fullname px-5 m-3">
                <input
                  type="text"
                  placeholder="Profile Summary*"
                  className="updateCoach-Content-input w-100 p-2"
                  value={description}
                  onChange={onChangeDescription}
                />
                <p style={{ color: 'red' }}>{errors['coachField']}</p>
              </div>

              <img src={UserProfilePic} alt="..." className="img-thumbnail" width="120" height="120"/>

              <div className="updateCoach-Content-fullname px-5 m-3">
                <label
                  htmlFor="file-upload"
                  className="btn updateCoach-actions-cancel btn-primary px-3 fw-bold"
                >
                  <input
                    id="file-upload"
                    type="file"
                    placeholder="File*"
                    className="w-100 p-2"
                    onChange={onChangeFile}
                  />
                  Edit Photo
                </label>
              </div>
            </div>

            <div className="updateCoach-actions d-flex d-flex justify-content-center">
              <div className="updateCoach-actions-cancel-wrapper px-3">
                <button
                  onClick={(e) => closePopup()}
                  className=" btn updateCoach-actions-cancel btn-outline-primary px-3 fw-bold"
                >
                  Cancel
                </button>
              </div>

              <div className="updateCoach-actions-save-wrapper px-3">
                <input
                  type="submit"
                  className="btn updateCoach-actions-cancel btn-primary px-3 fw-bold"
                  value="Save"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
}
