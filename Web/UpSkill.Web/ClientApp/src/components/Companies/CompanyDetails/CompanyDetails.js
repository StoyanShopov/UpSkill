import React from "react";
import {Link} from "react-router-dom";
import user from "../Images/user.jpg"

const CompanyDetails = (props) =>{
   const {name,email}= props.location.state.company;
    return(
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    {/* <div className="description">{email}</div> */}
                </div>
            </div>
            <div className="center-div">
              <Link to="/CompanyList">
                <button className="ui button blue center">Back</button>
                </Link>
            </div>
        </div>
    )
}

export default CompanyDetails;