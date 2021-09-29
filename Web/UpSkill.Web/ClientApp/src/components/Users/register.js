import { useState } from "react";
import loginImg from "../../assets/logo-NoBg.png";
import manCase from "../../assets/manCase.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Register() {

    useState = {
        user: {
            firstName: '',
            lastName: '',
            email: '',
            company: '',
            password: '',
            confirmPassowrd: ''
        },
        submitted: false
    }


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
     

    function handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;

        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    };

    function handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });

        const { user } = this.state;

        if (user.firstName
            && user.lastName
            && user.username
            && user.company
            && user.password
            && user.confirmPassowrd) {

            this.props.register(user);
        };


        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-6">
                        <img src={manCase} />
                    </div>
                    <div className="base-container col-lg-6">
                        <div class>
                            <img src={loginImg} />
                        </div>
                        <div className="content">
                            <form className="form" onSubmit={this.handleSubmit()}>
                                <div className={"form-group" + (this.submitted && !user.firstName ? ' has-error' : '')}>
                                    <label htmlFor="firstName"></label>
                                    <input type="text" name="firstName" value={user.firstName} placeholder="First Name" onChange={this.handleChange()} />
                                    {this.submitted && !user.firstName &&
                                        <div className="help-block">First Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (this.submitted && !user.lastName ? ' has-error' : '')}>
                                    <label htmlFor="lastName"></label>
                                    <input type="text" name="lastName" value={user.lastName} placeholder="Last Name" onChange={this.handleChange()} />
                                    {this.submitted && !user.lastName &&
                                        <div className="help-block">Last Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (this.submitted && !user.company ? ' has-error' : '')}>
                                    <label htmlFor="companyName"></label>
                                    <input type="text" name="companyName" value={user.company} placeholder="Company Name" onChange={this.handleChange()} />
                                    {this.submitted && !user.company &&
                                        <div className="help-block">Company is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (this.submitted && !user.email ? ' has-error' : '')}>
                                    <label htmlFor="email"></label>
                                    <input type="text" name="email" value={user.email} placeholder="Email Address" onChange={this.handleChange} />
                                    {this.submitted && !user.email &&
                                        <div className="help-block">Email is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (this.submitted && !user.password ? ' has-error' : '')}>
                                    <label htmlFor="password"></label>
                                    <input type="text" name="password" value={user.password} placeholder="Password" onChange={this.handleChange()} />
                                    {this.submitted && !user.password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (this.submitted && !user.confirmPassowrd ? ' has-error' : '')}>
                                    <label htmlFor="confirmPassword"></label>
                                    <input type="text" name="confirmPassword" value={user.confirmPassowrd} placeholder="Confirm Password" onChange={this.handleChange()} />
                                    {this.submitted && !user.confirmPassowrd &&
                                        <div className="help-block">Confirm password is required</div>
                                    }
                                </div>
                                <div>
                                    <button type="button" className="btn btn-primary btn-lg">
                                        SignUp
                                     </button>
                                    {registering &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                    <Link to="/login" className="btn btn-primary">Cancel</Link>
                                </div>
                                <div>
                                </div>
                            </form>
                        </div>
                        <div >
                            <br />
                            <p class="font-weight-bold">Already have an account? <a class="link-info " href="url">Login here</a></p>
                        </div>
                    </div>
                </div >
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

export default connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage) as Register;
 
