import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompanyCard from "../CompaniesCard/CompanyCard";
import { retriveCompanies } from "../../../services/companyService";

const CompanyList = (props) => {

    const [companies, setCompanies] = useState([])

    useEffect((companies) => {

        retriveCompanies().then(data => {
           
            setCompanies(data);
        });

    }, [companies])



    const deleteCompanyHandler = (id)=>{
       props.getCompanyId(id);
    };


    // const newCompanyList = companies.filter((company)=>{
    //     return company.id !== companies.id;
    //   });
    //   setCompanies(newCompanyList);
  


    return (
        <div class="main">
            <br />
            <h2> Companies </h2>
            <div className="ui celled list">
                {companies.map((company) => {
                    return (
                       
                            <CompanyCard company={company} clickHandler={deleteCompanyHandler}  key={company.id} />
                        

                    )
                }
                )
                };
            </div>

            <Link to="/AddCompany">
                <button className="ui button blue left">   Add Company</button>
            </Link>
            <br />
            <Link to="/">
                <button className="ui button blue center">Back</button>
                </Link>

        </div>

    )
}

export default CompanyList;