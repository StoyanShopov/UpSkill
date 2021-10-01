import { useState } from "react";
import { Link } from 'react-router-dom';

import loginImg from "../../../assets/logo-NoBg.png";
import manCase from "../../../assets/manCase.png"

export default function Register() {
    //Use state like this: user
    //Set state with: setUser()
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        password: '',
        confirmPassowrd: ''
    });
    const [submitted, setSubmitted] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        
        //No need for this. - in functional components

        setUser({
            ...user,
            [name]: value
        });
    };

    function handleSubmit(event) {
        event.preventDefault();

        setSubmitted(true);

        const { name, value } = event.target;

        if (user.firstName
            && user.lastName
            && user.username
            && user.company
            && user.password
            && user.confirmPassowrd) {

            this.props.register(user);
        };
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6">
                    <img src={manCase} />
                </div>
                <div className="base-container col-lg-6">
                    <div className="image-wrapper">
                        <img src={loginImg} />
                    </div>
                    <div className="content">
                        <form className="form" onSubmit={e => handleSubmit(e)}>
                            <div className={"form-group" + (submitted && !user.firstName ? ' has-error' : '')}>
                                <label htmlFor="firstName"></label>
                                <input type="text" name="firstName" value={user.firstName} placeholder="First Name" onChange={handleChange} />
                                {submitted && !user.firstName &&
                                    <div className="help-block">First Name is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                <label htmlFor="lastName"></label>
                                <input type="text" name="lastName" value={user.lastName} placeholder="Last Name" onChange={handleChange} />
                                {submitted && !user.lastName &&
                                    <div className="help-block">Last Name is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.company ? ' has-error' : '')}>
                                <label htmlFor="companyName"></label>
                                <input type="text" name="companyName" value={user.company} placeholder="Company Name" onChange={handleChange} />
                                {submitted && !user.company &&
                                    <div className="help-block">Company is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                <label htmlFor="email"></label>
                                <input type="text" name="email" value={user.email} placeholder="Email Address" onChange={handleChange} />
                                {submitted && !user.email &&
                                    <div className="help-block">Email is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                <label htmlFor="password"></label>
                                <input type="text" name="password" value={user.password} placeholder="Password" onChange={handleChange} />
                                {submitted && !user.password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !user.confirmPassowrd ? ' has-error' : '')}>
                                <label htmlFor="confirmPassword"></label>
                                <input type="text" name="confirmPassword" value={user.confirmPassowrd} placeholder="Confirm Password" onChange={handleChange} />
                                {submitted && !user.confirmPassowrd &&
                                    <div className="help-block">Confirm password is required</div>
                                }
                            </div>
                            <div>
                                {/* Adjust the button style manualy */}
                                <input type="submit" className="btn btn-primary btn-lg" value="SignUp" />

                                {/* {registering &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                } */}
                                <Link to="/Login" className="btn btn-primary mx-3">Cancel</Link>
                            </div>
                            <div>
                            </div>
                        </form>
                    </div>
                    <div >
                        <br />
                        <p className="font-weight-bold">
                            Already have an account?
                            <Link className="link-info " to="/Login">Login here</Link>
                        </p>
                    </div>
                </div>
            </div >
        </div>
    );
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

//And I still have no idea whats happening down here :D, but you do not need it

// const actionCreators = {
//     register: userActions.register
// }

// export default connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage) as Register;

