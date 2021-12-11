import React, { useEffect, useState } from 'react';

import './InvoicePriceTable.css';

import { getSubscriptionsForCompanyOwner } from "../../../../../services/companyOwnerService";

function InvoicePriceTable() {
    const [subscriptions, setSubscriptions] = useState([]);
    let [currentMount, setCurrentMount] = useState('9');
    let [currentMountName, setCurrentMountName] = useState('');
    let [totalForMonth, setTotalForMonth] = useState('');

    useEffect(() => {
        getSubscriptionsForCompanyOwner('', currentMount).then(mount=>{
            let [name, subscriptions, totalForMonth] = mount;
            setSubscriptions(subscriptions);
            setTotalForMonth(totalForMonth);
            setCurrentMountName(name);
        })
    }, [currentMount]);


    function changeMount(toMount) {
        let nextOrPrev = parseInt(currentMount) + toMount;
        setCurrentMount(nextOrPrev.toString());
    }

    return (
        <div className="wrap-table100 mt-5 shadow mb-5 bg-body rounded">
        <div className="ourTable">
            <div className="table-row table-monthHeading-wrapper header-EmployeeCourse align-content-center">
                <div className="cell px-2 table-monthHeading">
                <button className="fw-bolder" onClick={e => changeMount(-1)}>{'<'}</button>
                <span>{currentMountName}</span>
                <button className="fw-bolder" onClick={e => changeMount(1)}>{'>'}</button>
                </div>
            </div>
            <div className="table-row header-CoursesEnrolled header-invoice">
                <div className="cell cell-header-subscription">
                    Course/Coach
                </div>
                <div className="cell cell-header-date">
                    Date
                </div>
                <div className="cell cell-header-price">
                    Price
                </div>
            </div>
            <div className="table-content d-flex ">

                <div className="table-content-names w-50">
                    {subscriptions.map(subscription => {
                        return (
                            <div className="table-row px-3" key={subscription.name}>
                                <div className="cell name-cell-data" data-title="Course / Coach" href={subscription.price} date={subscription.date}>
                                    {subscription.name}
                                </div>
                            </div>);
                    })}
                </div>

                <div className="table-content-emails w-25">

                    {subscriptions.map(subscription => {
                        return (
                            <div className="table-row px-3" key={subscription.name}>
                                <div className="cell courses-cell-data" data-title="SubscriptionDate">
                                    {subscription.date}
                                </div>
                            </div>);
                    })}
                </div>

                <div className="table-content-emails w-25">

                    {subscriptions.map(subscription => {
                        return (
                            <div className="table-row px-3" key={subscription.name}>
                                <div className="cell courses-cell-price" data-title="SubscriptionPrice">
                                    {subscription.price}
                                </div>
                            </div>);
                    })}
                </div>

            </div>

            <div className="table-row px-3">
                <div className="table-totalForMonth d-flex" data-mdb-ripple-color="dark">
                    <div className="totalForMonth-heading w-50 cell border-0"><h5 className="fw-bold">Total</h5></div>
                    <div className="totalForMonth-content w-50 text-align-end cell border-0"><h5 className="fw-bold text-right">{totalForMonth}</h5></div> 
                </div>
            </div>
        </div>
    </div>
    );
}

export default InvoicePriceTable;