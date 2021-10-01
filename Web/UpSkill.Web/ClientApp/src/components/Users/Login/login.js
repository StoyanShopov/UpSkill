import React, { useState, useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import loginImg from "../../../assets/logo-NoBg.png";
import manImg from "../../../assets/manKey.png"

import {userService} from '../../../services/userService'; 


function Login() {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { email, password } = inputs;
    //const loggingIn = useSelector(state => state.authentication.loggingIn);
    //const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => {
        userService.logout();
    }, []);

    function handleChange(e) {
        
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (email && password) {
            userService.login(email, password);
        }
    }

    return (
        <div className="row">
            <div className="container col-md-6">
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
                                <input type="email" name="email" placeholder="Email Address" value={email} onChange={handleChange} className={'form-control' + (submitted && !email ? ' is-invalid' : '')} />
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
                        <div className="form-check text-primary">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label">Remember me</label>
                        </div>
                        <div className="link-info">
                            <a href="url">Forgot Password?</a>
                        </div>
                        <br />
                        <div className="btn-toolbar">
                                <input type="submit" className="btn btn-primary" value="Login"/>
                                    {/* {loggingIn && <span class="btn btn-primary col-xs-2" type="button"></span>} */}
                                <Link to="/Register" className="btn btn-outline-primary col-xs-2 mx-3" type="button"> Sign Up</Link>
                        </div>
                    </div>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default Login;