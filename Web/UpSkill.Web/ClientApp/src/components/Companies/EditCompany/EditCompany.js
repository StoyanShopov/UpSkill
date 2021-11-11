import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { updateCompanyHandler, getCompanies } from "../../../services/companyService";

function EditCompany(props) {


    const [name, setName] = useState(props.location.state.company.name);

    const [id, setId] = useState(props.location.state.company.id);

    const update = (e) => {
        e.preventDefault();

        if (name === "") {
            alert("All the fields are mandatory!");
            return
        }
        const company = {
            id,
            name

        }
        updateCompanyHandler(company);

        props.history.push("/CompanyList")
    };


    return (

        <div className="ui main">
            <br />
            <h2>Edit Company</h2>
            <form className="ui form" onSubmit={update}>
                <div className="field">
                    <label>Name</label>
                    <input type="text"
                        name="name" placeholder="Name"
                        value={name}
                        onChange={(e) => setName(name => e.target.value)} />
                </div>

                <button className="ui button blue" onClick="edit">Update</button>
                <br />
                <br />

                <div className="center-div">
                    <Link to="/">
                        <button className="ui button blue center">Back</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}


export default EditCompany;
