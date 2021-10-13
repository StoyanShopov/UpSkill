import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";  

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import logo from "../../assets/logo-NoBg.png";
import manCase from "../../assets/manCase.png";
 
import { register } from "../../actions/auth"; 

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6  || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
}; 

const vconfirmPassword = (value) => {
  if(value.confirmPassword !== value.password) {
    return (
      <div className="alert alert-danger" role="alert">
        Confirm Password does not match.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState(""); 
  const [companyName, setCompanyName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  }; 

  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  }; 

  const onChangeCompanyName = (e) => {
    const companyName = e.target.value;
    setCompanyName(companyName);
  }; 

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };  

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  }; 

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(firstName, lastName, companyName, email, password, confirmPassword))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="row">
    <div className="container col-md-6">
        <img src={manCase} alt="" />
    </div>
    <div className="base-container col-md-6" >
        <div className="image">
            <img src={logo} alt="" />
        </div>
      <Form onSubmit={handleRegister} ref={form}>
        {!successful && (
        <div> 
            <div className="form-group ">
                <label htmlFor="firstName"></label>
                    <Input 
                        type="text"  
                        className="form-control"
                        name="firstName" 
                        placeholder="First Name" 
                        value={firstName} 
                        onChange={onChangeFirstName}  
                        validations={[required]} 
                    />
            </div>  
                        
            <div className="form-group ">
                <label htmlFor="lastName"></label>
                    <Input 
                        type="text"  
                        className="form-control"
                        name="lastName" 
                        placeholder="Last Name" 
                        value={lastName} 
                        onChange={onChangeLastName}  
                        validations={[required]} 
                    />
            </div>   

            <div className="form-group ">
              <label htmlFor="companyName"></label>
                    <Input 
                       type="text"  
                        className="form-control"
                        name="companyName" 
                        placeholder="Company Name" 
                        value={companyName} 
                        onChange={onChangeCompanyName}  
                        validations={[required]} 
                   />
            </div>    

            <div className="form-group ">
                <label htmlFor="email"></label>
                    <Input 
                        type="text"  
                        className="form-control"
                        name="email" 
                        placeholder="Email Address" 
                        value={email} 
                        onChange={onChangeEmail}  
                        validations={[required, validEmail]} 
                    />
            </div> 

            <div className="form-group ">
                <label htmlFor="password"></label>
                    <Input 
                        type="password" 
                        className="form-control"
                        name="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={onChangePassword} 
                        validations={[required, vpassword]} 
                    />
            </div>  

            <div className="form-group ">
                <label htmlFor="confirmPassword"></label>
                    <Input 
                        type="password" 
                        className="form-control"
                        name="confirmPassword" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={onChangeConfirmPassword} 
                        validations={[required, vconfirmPassword]} 
                    />
            </div>   
            <br/>
            <div className="form-group">
              <button className="btn btn-primary btn-block">Sign Up</button><br/>
              <br/>
              <div className="link-info">
                <p>Already have an account?</p> <a href="/Login"><b>Login here</b></a> 
              </div> 
            </div>
          </div>
        )}
        {message && (
          <div className="form-group">
            <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  </div>
 );
};

export default Register;
