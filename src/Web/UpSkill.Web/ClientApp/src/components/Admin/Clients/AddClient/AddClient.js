import React, { useState, useEffect } from 'react';

import { addClient } from '../../../../services/adminDashboardService';
import { enableBodyScroll } from '../../../../utils/utils';

import '../../../MyProfile/CompanyOwnerViews/Employees/AddEmployee/AddEmployee.css';

export default function AddClient(props) {

    const [name,setName]= useState("");

    const saveClient = (e) =>{
        e.preventDefault();      
        addClient(name).then((result) => {
            console.log(result[0]);
            if(result[0] === 'Successfully created.') {
                closePopup();
            }
        });
    }

      const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
      };
      
    function closePopup() {
        enableBodyScroll();
        props.onAddClient(false);
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
                        <h4>Add Client</h4>
                    </div>
                </div>
                <form onSubmit={saveClient}>
                    <div className="addEmployee-Content px-5 m-5">
                        <div className="addEmployee-Content-fullname px-5 m-3">
                            <input type="text" name="fullName" placeholder="Full Name*" value={name} onChange={onChangeName} className="addEmployee-Content-input w-100 p-2" />
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
