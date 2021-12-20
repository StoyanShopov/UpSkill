import React, { useEffect, useState } from "react";

import "../../../../MyProfile/CompanyOwnerViews/Invoice/InvoicePriceTable/InvoicePriceTable.css";

import { profitAdminMock } from "../../../../../services/adminDashboardService";

function InvoicePriceTable() {
  return (
      
    <div className="content-wrapper">
      <div className="main-content">
        <div className="wrap-table100 mt-5 shadow mb-5 bg-body rounded">
          <div className="ourTable">
            <div className="table-row header-CoursesEnrolled header-invoice">
              <div className="cell cell-header-subscription">Course/Coach</div>
              <div className="cell cell-header-date">Revenue</div>
              <div className="cell cell-header-price">Expenses</div>
              <div className="cell cell-header-price">Profit</div>
            </div>
            <div className="table-content d-flex">
              <div className="table-content-names w-50">
                {profitAdminMock.map((info) => {
                  return (
                    <div className="table-row px-4" key={info.id}>
                      <div
                        className="cell name-cell-data"
                        id="table-contents-font"
                        data-title="Course / Coach"
                        href={info.price}
                        date={info.revenue}
                      >
                        {info.title}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="table-content-emails w-25">
                {profitAdminMock.map((info) => {
                  return (
                    <div className="table-row px-4" key={info.title}>
                      <div
                        className="cell courses-cell-data"
                        id="table-contents-font"
                        data-title="SubscriptionDate"
                      >
                        {info.revenue}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="table-content-emails w-25">
                {profitAdminMock.map((info) => {
                  return (
                    <div className="table-row px-4" key={info.title}>
                      <div
                        className="cell courses-cell-data"
                        id="table-contents-font"
                        data-title="SubscriptionDate"
                      >
                        {info.expenses}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="table-content-emails w-25">
                {profitAdminMock.map((info) => {
                  return (
                    <div className="table-row px-4" key={info.revenue}>
                      <div
                        className="cell courses-cell-price"
                        id="table-contents-price-font"
                        data-title="SubscriptionPrice"
                      >
                        {info.profit}€
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="table-row px-4">
              <div
                className="table-totalForMonth d-flex"
                data-mdb-ripple-color="dark"
              >
                <div className="totalForMonth-heading w-75 cell border-0">
                  <h5 id="total-price-tag">Total</h5>
                </div>
                <div className="totalForMonth-content w-25 text-align-end cell border-0">
                  <h5 className="text-right profitClass" id="total-price">
                    13000€
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoicePriceTable;
