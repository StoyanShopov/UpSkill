import React from "react";
import loginImg from "../../loginLogo.png";
import manCase from "../../manCase.png"
import 'bootstrap/dist/css/bootstrap.min.css';

export class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <div class="container-fluid" ref={this.props.containerRef}>
        <div class="row">
          <div class="col-lg-6">
            <img src={manCase} />
          </div>
          <div className="base-container col-lg-6">
            <div class>
              <img src={loginImg} />
            </div>
            <div className="content">
              <div className="form">
                <div className="form-group">
                  <label htmlFor="firstName"></label>
                  <input type="text" name="firstName" placeholder="First Name" />
                </div>
                <div className="form-group" >
                  <label htmlFor="lastName"></label>
                  <input type="text" name="lastName" placeholder="Last Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="companyName"></label>
                  <input type="text" name="companyName" placeholder="Company Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email"></label>
                  <input type="text" name="email" placeholder="Email Address" />
                </div>
                <div className="form-group">
                  <label htmlFor="password"></label>
                  <input type="text" name="password" placeholder="Password" />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword"></label>
                  <input type="text" name="confirmPassword" placeholder="Confirm Password" />
                </div>
                <div>
                  <button type="button" className="btn btn-primary btn-lg">
                    SignUp
                  </button>
                </div>
                <div>
                </div>
              </div>
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
