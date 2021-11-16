import React, { useEffect, useState, useContext } from "react";
import CategoriesAndLanguageMenu from "../CategoriesAndLanguageMenu/categoryAndLanguageMenu";
import CoachesCatalog from "../Coaches/CoachesCatalog/CoachesCatalog";
import OwnerCoachesCatalog from "../Coaches/CoachesCatalog/OwnerCoachesCatalog/OwnerCoachesCatalog";
import { ReactReduxContext } from "react-redux";

import "./Coaches.css";

import { getAllCoaches, getCoaches } from "../../services/coachService";
import AdminCoachesCatalog from "./CoachesCatalog/AdminCoachesCatalog/AdminCoachesCatalog";

export default function Coaches() {
  const { store } = useContext(ReactReduxContext);
  var {
    isLoggedIn,
    isCompanyOwner,
    isEmployee,
    isAdmin,
  } = store.getState().auth;

  const [coaches, setCoaches] = useState([]);
  const [companyCoaches, setCompanyCoaches] = useState([]);

  const returnCatalog= () => {
    if (isAdmin) {
      return <AdminCoachesCatalog coaches={coaches} setCoaches={setCompanyCoaches}/>
    }
    if (isCompanyOwner) {
      return <OwnerCoachesCatalog coaches={coaches} companyCoaches={companyCoaches} setCoaches={setCompanyCoaches}/>
    }
    return <CoachesCatalog coaches={coaches} />
  }

  useEffect(() => {
    getAllCoaches(0).then((coaches) => {
      setCoaches(coaches);
    });
  }, [companyCoaches]);

  useEffect(() => {
    if (isCompanyOwner) {
      getCoaches(0).then((companyCoaches) => {
        setCompanyCoaches(companyCoaches);
      });
    }
  }, []);
  
  return (
    <div className="content">
      <CategoriesAndLanguageMenu atPage="Coaches" />
      <div className="wrapper row">
        {returnCatalog()}
      </div>
    </div>
  );
}
