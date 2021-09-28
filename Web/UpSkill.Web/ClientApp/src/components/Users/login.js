import React from "react";
import loginImg from "../../assets/logo-NoBg.png";
import manImg from "../../assets/manKey.png"
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        //function handleClick(event) {
        //  var apiBaseUrl = "http://localhost:4000/api/";
        //  var self = this;
        //  var payload = {
        //    "email": this.state.email,
        //    "password": this.state.password
        //  }

        //  axios.post(apiBaseUrl + 'login', payload)
        //    .then(function (response) {
        //      console.log(response);

        //      if (response.data.code == 200) {
        //        console.log("Login successfull");
        //        // var uploadScreen=[];
        //        // uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
        //        // self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
        //      }
        //      else if (response.data.code == 204) {
        //        console.log("Username password do not match");
        //        alert("username password do not match")
        //      }
        //      else {
        //        console.log("Username does not exists");
        //        alert("Username does not exist");
        //      }
        //    })
        //    .catch(function (error) {
        //      console.log(error);
        //    });

        //}
    }

    render() {
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
                    <div className="content">
                        <div className="form ">
                            <div className="form-group ">
                                <label htmlFor="email"></label>
                                <input type="text" name="email" placeholder="Email Address" />
                            </div>
                            <div className="form-group ">
                                <label htmlFor="password"></label>
                                <input type="password" name="password" placeholder="Password" />
                            </div>
                            <div class="form-check text-primary">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" >Запомни ме</label>
                            </div>
                            <div class="link-info">
                                <a href="url">Забравена парола?</a>
                            </div>
                            <br />
                            <div class="btn-toolbar">
                                <button class="btn btn-primary col-xs-2" type="button" >
                                    Login
                                </button>
                                <br />
                                <button class="btn btn-outline-primary col-xs-2" type="button" >
                                    Sign Up
                                 </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}