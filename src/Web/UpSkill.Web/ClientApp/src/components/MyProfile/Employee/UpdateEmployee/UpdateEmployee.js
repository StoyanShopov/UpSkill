import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';

import {
  updateEmployee,
  getEmployee,
} from '../../../../services/employeeService';
import { enableBodyScroll } from '../../../../utils/utils';

import UserProfilePic from '../../../../assets/userProfilePic.png';

import './UpdateEmployee.css';

export default function UpdateEmployee({ closeModal }) {
  const [description, setDescription] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [filePath, setFilePath] = useState('');
  const [id, setId] = useState('');
  const [file, setFile] = useState({});
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  let handleValidation = () => {
    let fields = {
      firstName,
      lastName,
    };
    let errorsValidation = {};
    let formIsValid = true;

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
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    getEmployee().then((employee) => {
      setId(employee.id);
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
      setEmail(employee.email);
      setDescription(employee.profileSummary);
      setFilePath(employee.filePath);
    });
  }, []);

  function submitEditEmployee(e) {
    e.preventDefault();
    if (handleValidation()) {
      updateEmployee(id, firstName, lastName, file, description)
        .then((resp) => {
          if (resp.status === 200) {
            setSuccess(true);
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

  return (
    <div className="deleteModal-background">
      <div className="updateEmployee-popup">
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

          <form onSubmit={(e) => submitEditEmployee(e)}>
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
                <p style={{ color: 'red' }}>{errors['firstName']}</p>
              </div>

              <div className="updateCoach-Content-fullname px-5 m-3">
                <input
                  type="text"
                  placeholder="Last Name*"
                  className="updateCoach-Content-input w-100 p-2"
                  value={lastName}
                  onChange={onChangeLastName}
                />
                <p style={{ color: 'red' }}>{errors['lastName']}</p>
              </div>

              <div className="updateCoach-Content-fullname px-5 m-3">
                <input
                  disabled
                  type="text"
                  placeholder="Email*"
                  className="updateCoach-Content-input w-100 p-2"
                  value={email}
                />
              </div>

              <div className="updateCoach-Content-fullname px-5 m-3">
                <textarea
                  type="text"
                  placeholder="Profile Summary"
                  className="updateCoach-Content-input w-100 p-2"
                  value={description}
                  onChange={onChangeDescription}
                />
              </div>

              <Image
                style={{
                  width: '6rem',
                  height: '6rem',
                  display: 'inline-flex',
                }}
                roundedCircle={false}
                src={!filePath ? UserProfilePic : filePath}
              />

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
  );
}
