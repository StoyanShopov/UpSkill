import React from "react";
import loginImg from "../../assets/logo-NoBg.png";
import manImg from "../../assets/manKey.png"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import userService from '@/_services'; 
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';

function Login() {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { email, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(email, password, from));
        }
    }

    return (
        <div class="row" ref={this.props.containerRef}>
            <div class="container col-md-6">
                <img src={manImg} />
            </div>
            <div className="base-container col-md-6" >
                <div className="image">
                    <img src={loginImg} />
                </div>
                <div className="header text-dark">
                    <br /> <br />
                    <p>Welcome back! <br />Please login to your account!</p>
                </div>
                <form name="form" onSubmit={handleSubmit}>
                 <div className="content">
                    <div className="form ">
                        <div className="form-group ">
                                <label htmlFor="email"></label>
                                <input type="text" name="email" placeholder="Email Address" value={email} onChange={handleChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} />
                                {submitted && !email &&
                                    <div className="invalid-feedback">Email is required</div>
                                }
                        </div>
                        <div className="form-group ">
                            <label htmlFor="password"></label>
                            <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                                {submitted && !password &&
                                    <div className="invalid-feedback">Password is required</div>
                                }
                        </div>
                        <div class="form-check text-primary">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label">Remember me</label>
                        </div>
                        <div class="link-info">
                            <a href="url">Forgot Password?</a>
                        </div>
                        <br />
                        <div class="btn-toolbar">
                                <button >
                                    {loggingIn && <span class="btn btn-primary col-xs-2" type="button"></span>}
                                    Login
                                </button>
                            <br />
                                <button>
                                    <Link to="/register" class="btn btn-outline-primary col-xs-2" type="button"> Sign Up</Link>
                                 </button>
                        </div>
                    </div>
                    </div>
                </form>
            </div>
        </div >
    );
}

export { LoginPage };