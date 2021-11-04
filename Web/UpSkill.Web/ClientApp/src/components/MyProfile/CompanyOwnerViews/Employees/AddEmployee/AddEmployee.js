import React, { useState, useEffect } from 'react';

import { addEmployee } from '../../../../../services/companyOwnerService';
import { enableBodyScroll } from '../../../../../utils/utils';

import './AddEmployee.css';

export default function AddEmployee(props) {

    const [email,setEmail]= useState("");
    const [fullName,setFullName]= useState("");
    const [position,setPosition]= useState("");

    const saveEmployee =(e) =>{
        e.preventDefault();
      

        addEmployee(fullName, email,position);
    }
    // function saveEmployee(e) {
    //     e.preventDefault();
    //     // let fullName = e.target.children[0].children[0].children[0].value;
    //     // let email = e.target.children[0].children[1].children[0].value;
    //     // let position = e.target.children[0].children[2].children[0].value;

    //     addEmployee(fullName, email,position);
    // }
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
      }; 

      const onChangefullName = (e) => {
        const fullName = e.target.value;
        setFullName(fullName);
      };
      
      const onChangePosition = (e) => {
        const position = e.target.value;
        setPosition(position);
      };
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
                <form onSubmit={saveEmployee}>
                    <div className="addEmployee-Content px-5 m-5">
                        <div className="addEmployee-Content-fullname px-5 m-3">
                            <input type="text" name="fullName" placeholder="Full Name*" value={fullName} onChange={onChangefullName} className="addEmployee-Content-input w-100 p-2" />
                        </div>

                        <div className="addEmployee-Content-email px-5 m-3">
                            <input type="text" name="email" placeholder="Email Address*" value={email} onChange={onChangeEmail} className="addEmployee-Content-input w-100 p-2" />
                        </div>
                        <div className="addEmployee-Content-email px-5 m-3">
                            <input type="text" name="position" placeholder="Position*" value={position} onChange={onChangePosition} className="addEmployee-Content-input w-100 p-2" />
                        </div>

                        {/* <div className="addEmployee-Content-anotherEmployee px-5">
                            <div className="addEmployee-Content-anotherEmployee-btn btn">*Add another employee</div>
                        </div> */}
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
