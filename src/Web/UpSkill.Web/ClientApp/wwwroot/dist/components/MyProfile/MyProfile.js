import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactReduxContext } from 'react-redux';

import { history } from '../../helpers/history';

import CompanyOwner from './CompanyOwnerViews/CompanyOwner';
import Employee from './Employee/Employee';

function MyProfile() {
    var _useContext = useContext(ReactReduxContext),
        store = _useContext.store;

    var _store$getState$auth = store.getState().auth,
        isLoggedIn = _store$getState$auth.isLoggedIn,
        isCompanyOwner = _store$getState$auth.isCompanyOwner,
        isEmployee = _store$getState$auth.isEmployee,
        isAdmin = _store$getState$auth.isAdmin;


    useEffect(function () {
        if (!isLoggedIn) history.push("/");
    }, []);

    if (isCompanyOwner) {
        return React.createElement(CompanyOwner, null);
    } else if (isEmployee) return React.createElement(Employee, null);
    //Probably the admin will acces his area from here too
    else if (isAdmin) return React.createElement(
            'div',
            { className: 'container p-5 text-center' },
            React.createElement(
                'h2',
                null,
                'Admin Dashboard here?'
            )
        );
        //     return <Admin />;
        else return React.createElement(
                'div',
                { className: 'container p-5 text-center vh-70' },
                React.createElement(
                    'h2',
                    { className: 'py-5' },
                    'Please ',
                    React.createElement(
                        Link,
                        { to: '/Login' },
                        'Login'
                    ),
                    ' or ',
                    React.createElement(
                        Link,
                        { to: '/Register' },
                        'Sign Up'
                    ),
                    ' first'
                )
            );
}

export default MyProfile;