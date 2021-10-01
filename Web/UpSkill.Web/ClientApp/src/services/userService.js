import axios from 'axios';

//import config from 'config';
import { useLocation } from 'react-router';
//import { handleResponse } from '@/_helpers';

//Continue with fetch for now, we gonna research axios later.
export const userService = {
    login,
    logout,
    register
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    ///TODO: config.js somewhere in src
    return fetch(`${'config.apiUrl'}/identity/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${'config.apiUrl'}/identity/register`, requestOptions).then(handleResponse);
}

// Good for initial tests, it will be changed in the future
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                useLocation().reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}