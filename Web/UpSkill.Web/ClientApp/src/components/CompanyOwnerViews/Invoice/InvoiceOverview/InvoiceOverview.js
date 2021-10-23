import React, { useEffect, useState } from 'react';

import './InvoiceOverview.css';

import { getInvoiceStatus } from "../../../../services/companyOwnerService";
import { getDueDate } from "../../../../services/companyOwnerService";

function InvoiceOverview() {
    const [status, setStatus ] = useState();
    const [dueDate, setDueDate] = useState();    

    useEffect(() => {
        getInvoiceStatus('').then((status) => {
            setStatus(status);
        });
        getDueDate('').then((date) => {
            setDueDate(date);
          });
        
      }, []);        
         
    return (
            <div className="table">
                <div className="Overview d-flex mt-5 mb-4 shadow px-5 py-4">
                    <div className="Overview-count Overview-cell">
                        <h4>Invoice Status</h4>
                        <h3 className="invoice-status">{status}</h3>
                    </div>
                    <div className="Overview-activeCourses invoice-date-wrapper Overview-cell">
                        <h4>Due Date</h4>
                        <h4 className="invoice-date">{dueDate}</h4>
                    </div>
                    <div className="Overview-activeCoaches Overview-cell">
                        <h4 className="btn btn-outline-primary btn-download">Download</h4>
                    </div>
                </div>
            </div>
    );
}

export default InvoiceOverview;