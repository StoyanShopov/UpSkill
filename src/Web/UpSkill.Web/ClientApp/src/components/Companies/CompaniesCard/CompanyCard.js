import React from "react";
import { Link } from "react-router-dom";
import user from "../Images/user.png";

const CompanyCard = (props) => {
   const { id, name,} = props.company;
   return (
      <div className="item">


         <div className="content">
            <Link to={{ pathname: `/Admin/Company/${id}`, state: { company: props.company } }}>
               <img className="ui avatar imag" src={user} alt="user" />
               <div className="header">{name}</div>               
            </Link>

         </div>

         <div>
            <button className="Delete"
               style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
               onClick={() => {
                  const confirm = window.confirm('Are you sure you wish to delete this company?');
                  if (confirm) {
                     props.clickHandler(id)
                  }
               }}>Delete</button>
         </div>
         <Link to={{ pathname: `/Admin/Companies/edit`, state: { company: props.company } }}>
            <button className="outline-primary"
               style={{ color: "blue", marginTop: "7px", marginLeft: "10px" }}
            >Edit</button>
         </Link>
      </div>

   )
};
export default CompanyCard;
