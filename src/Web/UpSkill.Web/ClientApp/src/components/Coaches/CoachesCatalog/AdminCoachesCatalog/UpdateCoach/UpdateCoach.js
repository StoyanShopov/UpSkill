import React, { useState, useEffect } from 'react';

import { updateCoach } from '../../../../../services/adminCoachesService';
import { enableBodyScroll } from '../../../../../utils/utils';
import './UpdateCoach.css';

export default function UpdateCoach({ closeModal, trigger, coachDetails }) {
  const [coachField, setCoachField] = useState('');
  const [coachPrice, setCoachPrice] = useState(0);
  const [coachFirstName, setCoachFirstName] = useState('');
  const [coachLastName, setCoachLastName] = useState('');
  const [coachId, setCoachId] = useState('');
  const [file, setFile] = useState({});
  const [calendlyUrl, setCalendlyUrl] = useState('');
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const test = localStorage.getItem('ID');

  var expression = /^https:\/\/calendly\.com\/[A-Za-z0-9-_]+$/gi;
  var regex = new RegExp(expression);
  var isPassing = regex.test(calendlyUrl);

  let handleValidation = () => {
    let fields = {
      coachField,
      coachPrice,
      coachFirstName,
      coachLastName,
      calendlyUrl,
      file,
    };
    let errorsValidation = {};
    let formIsValid = true;

    if (!fields['coachField']) {
      formIsValid = false;
      errorsValidation['coachField'] = 'Cannot be empty';
    }

    if (!fields['file']) {
      formIsValid = false;
      errorsValidation['file'] = 'Cannot be empty';
    }

    if (!fields['coachFirstName']) {
      formIsValid = false;
      errorsValidation['coachFirstName'] = 'Cannot be empty';
    }

    if (!fields['coachLastName']) {
      formIsValid = false;
      errorsValidation['coachLastName'] = 'Cannot be empty';
    }

    if (!fields['calendlyUrl']) {
      formIsValid = false;
      errorsValidation['calendlyUrl'] = 'Please fill in a correct Calendly URL';
    }

    if (!isPassing) {
      formIsValid = false;
      errorsValidation['calendlyUrl'] = 'Please fill in a correct Calendly URL';
    }

    if (fields['coachPrice'] < 0 || !fields['coachPrice']) {
      formIsValid = false;
      errorsValidation['coachPrice'] = 'Cannot be negative number';
    }

    setErrors(errorsValidation);
    return formIsValid;
  };

  const onChangeCalendlyUrl = (e) => {
    setCalendlyUrl(e.target.value);
  };

  const onChangeCoachPrice = (e) => {
    setCoachPrice(e.target.value);
  };

  const onChangeField = (e) => {
    setCoachField(e.target.value);
  };

  const onChangeFirstName = (e) => {
    setCoachFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setCoachLastName(e.target.value);
  };

  const onChangeFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    setCoachId(localStorage.getItem('ID'));
    setCoachFirstName(localStorage.getItem('FirstName'));
    setCoachLastName(localStorage.getItem('LastName'));
    setCoachField(localStorage.getItem('Field'));
    setCoachPrice(localStorage.getItem('Price'));
    setCalendlyUrl(localStorage.getItem('CalendlyUrl'));
  }, [test]);

  function submitEditCoach(e) {
    e.preventDefault();
    if (handleValidation()) {
      updateCoach(
        coachDetails.id,
        coachFirstName,
        coachLastName,
        coachField,
        coachPrice,
        file,
        calendlyUrl
      )
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            setSuccess(true);
            setCoachFirstName('');
            setCoachLastName('');
            setCoachField('');
            setCoachPrice(0);
            setCalendlyUrl('');
            localStorage.removeItem('ID');
            localStorage.removeItem('FirstName');
            localStorage.removeItem('LastName');
            localStorage.removeItem('Field');
            localStorage.removeItem('Price');
            localStorage.removeItem('CalendlyUrl');
            closePopup();
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
    setErrors({});
  }

  return trigger ? (
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
              <h4>Update Coach</h4>
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
                  value={coachFirstName}
                  onChange={onChangeFirstName}
                />
                <p style={{ color: 'red' }}>{errors['coachFirstName']}</p>
              </div>
              <div className="updateCoach-Content-fullname px-5 m-3">
                <input
                  type="text"
                  placeholder="Last Name*"
                  className="updateCoach-Content-input w-100 p-2"
                  value={coachLastName}
                  onChange={onChangeLastName}
                />
                <p style={{ color: 'red' }}>{errors['coachLastName']}</p>
              </div>
              <div className="updateCoach-Content-fullname px-5 m-3">
                <input
                  type="text"
                  placeholder="Field*"
                  className="updateCoach-Content-input w-100 p-2"
                  value={coachField}
                  onChange={onChangeField}
                />
                <p style={{ color: 'red' }}>{errors['coachField']}</p>
              </div>
              <div className="updateCoach-Content-fullname px-5 m-3">
                <input
                  type="text"
                  placeholder="Price"
                  className="updateCoach-Content-input w-100 p-2"
                  value={coachPrice}
                  onChange={onChangeCoachPrice}
                />
                <p style={{ color: 'red' }}>{errors['coachPrice']}</p>
              </div>
              <div className="createCoach-Content-fullname px-5 m-3">
                <input
                  type="text"
                  placeholder="Calendly url*"
                  className="createCoach-Content-input w-100 p-2"
                  value={calendlyUrl}
                  onChange={onChangeCalendlyUrl}
                />
                <p style={{ color: 'red' }}>{errors['calendlyUrl']}</p>
              </div>
              <div className="updateCoach-Content-fullname px-5 m-3">
                <input
                  type="file"
                  placeholder="File*"
                  className="w-100 p-2"
                  onChange={onChangeFile}
                />
              </div>
              {/* <div className="updateCoach-Content-anotherEmployee ps-5">
                <div className="updateCoach-Content-anotherEmployee-btn btn">
                  + Create another coach
                </div>
              </div> */}
              <p style={{ color: 'red' }}>{errors['file']}</p>
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
                  value="Update"
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
