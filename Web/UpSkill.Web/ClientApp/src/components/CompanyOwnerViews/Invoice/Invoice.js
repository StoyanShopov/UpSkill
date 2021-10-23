import React from 'react';

import InvoiceOverview from "./InvoiceOverview/InvoiceOverview";
import InvoicePriceTable from "./InvoicePriceTable/InvoicePriceTable";

import "./Invoice.css";

function Invoice() {
    return (
        <>
            <div className="content-wrapper">
                <div className="main-content">
                    <InvoiceOverview />

                    <InvoicePriceTable />                    
                </div>
            </div>
        </>
    );
}

export default Invoice;