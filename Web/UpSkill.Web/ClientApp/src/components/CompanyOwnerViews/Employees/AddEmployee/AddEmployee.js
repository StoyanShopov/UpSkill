import React, { useState, useEffect } from 'react';

import { addEmployee } from '../../../../services/companyOwnerService';
import { enableBodyScroll } from '../../../../utils/utils';

import './AddEmployee.css';

export default function AddEmployee(props) {

    function saveEmployee(e) {
        e.preventDefault();
        let fullName = e.target.children[0].children[0].children[0].value;
        let email = e.target.children[0].children[1].children[0].value;

        addEmployee('', fullName, email);
    }

    function closePopup() {
        enableBodyScroll();
        props.onAddEmployee(false);
    }


    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <div className="popup-Header">

                    <div className="closebtn d-flex justify-content-end p-2">
                        <button onClick={e => closePopup()} className="closebtn btn"><i className="fas fa-times"></i></button>
                    </div>
                    <div className="uploadCSV d-flex justify-content-end px-3">
                        <button className="closebtn btn btn-outline-light">Upload CSV file</button>
                    </div>
                    <div className="popup-Title p-2">
                        <h4>Add Employee</h4>
                    </div>
                </div>
                <form onSubmit={e => saveEmployee(e)}>
                    <div className="addEmployee-Content px-5 m-5">
                        <div className="addEmployee-Content-fullname px-5 m-3">
                            <input type="text" placeholder="Full Name*" className="addEmployee-Content-input w-100 p-2" />
                        </div>

                        <div className="addEmployee-Content-email px-5 m-3">
                            <input type="text" placeholder="Email Address*" className="addEmployee-Content-input w-100 p-2" />
                        </div>

                        <div className="addEmployee-Content-anotherEmployee px-5">
                            <div className="addEmployee-Content-anotherEmployee-btn btn">*Add another employee</div>
                        </div>
                    </div>

                    <div className="addEmployee-actions d-flex px-5 d-flex justify-content-center">
                        <div className="addEmployee-actions-cancel-wrapper px-3">
                            <button onClick={e => closePopup()} className="addEmployee-actions-cancel btn-outline-primary px-3 fw-bold">Cancel</button>
                        </div>

                        <div className="addEmployee-actions-save-wrapper px-3">
                            <input type="submit" className="addEmployee-actions-save btn-primary px-4 fw-bold" value="Save" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    ) : '';
}
