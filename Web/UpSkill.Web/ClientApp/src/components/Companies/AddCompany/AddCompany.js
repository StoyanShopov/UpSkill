import React from "react";
import {useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import { addCompanyHandler ,retriveCompanies} from "../../../services/companyService";



function AddCompany (props){

    const [name,setName]=useState("");  
    const [companies, setCompanies] = useState([]);

    useEffect((companies) => {

        retriveCompanies().then(data => {           
            setCompanies(data);
        });

    }, [companies])

const add= (e) => {
    e.preventDefault();

    if (name === "" ) {
        alert("All the fields are mandatory!");
        return
    }
    const company = {
       
        name,
        
    }
    addCompanyHandler(company);
   
    props.history.push("/CompanyList")


};
  const onChangeName = (e) => {
    const name= e.target.value;
    setName(name);
  };
     
        return(
            
<div className="ui main">
<br/>
    <h2>Add Company</h2>
    <form className="ui form" onSubmit={add}>
        <div className="field">
            <label>Name</label>
            <input type="text"
             name="name" placeholder="Name"
             value = {name}
              onChange={onChangeName} />
        </div>
       
        <button className="ui button blue">Add</button>
        <br/>
        <br/>
        
        <div className="center-div">
              <Link to="/CompanyList">
                <button className="ui button blue center">Back</button>
                </Link>
            </div>
    </form>
</div>
        );
    }


export default AddCompany;
