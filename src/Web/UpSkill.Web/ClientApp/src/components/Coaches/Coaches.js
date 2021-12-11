import React, { useEffect, useState, useContext } from "react";
import CategoriesAndLanguageMenu from "../CategoriesAndLanguageMenu/categoryAndLanguageMenu";
import CoachesCatalog from "../Coaches/CoachesCatalog/CoachesCatalog";
import OwnerCoachesCatalog from "../Coaches/CoachesCatalog/OwnerCoachesCatalog/OwnerCoachesCatalog";
import { ReactReduxContext, useDispatch } from "react-redux";
import { CHECK_CURRENT_STATE } from "../../actions/types";
import CoachesIntroBar from "../Admin/Coaches/CoachesIntroBar";

import "./Coaches.css";

import { getAllCoaches } from "../../services/coachService";
import { getCoaches as companyCoachesInput } from "../../services/companyOwnerCoachesService";
import AdminCoachesCatalog from "./CoachesCatalog/AdminCoachesCatalog/AdminCoachesCatalog";

export default function Coaches() {
  const { store } = useContext(ReactReduxContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCompanyOwner, setIsCompanyOwner] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CHECK_CURRENT_STATE,
    });

    var {
      isLoggedIn,
      isCompanyOwner,
      isEmployee,
      isAdmin,
    } = store.getState().auth;

    setIsLoggedIn(isLoggedIn);
    setIsCompanyOwner(isCompanyOwner);
    setIsEmployee(isEmployee);
    setIsAdmin(isAdmin);

    console.log(isLoggedIn);
    console.log("isCompanyOwner: " + isCompanyOwner);
    console.log("isAdmin: " + isAdmin);
  }, []);

  const [coaches, setCoaches] = useState([]);
  const [companyCoaches, setCompanyCoaches] = useState([]);

  const returnCatalog = () => {
    if (isCompanyOwner) {
      return (
        <OwnerCoachesCatalog
          coaches={coaches}
          companyCoaches={companyCoaches}
          setCoaches={setCompanyCoaches}
        />
      );
    }
    return <CoachesCatalog coaches={coaches} />;
  };

  useEffect(() => {
    getAllCoaches(0).then((coaches) => {
      setCoaches(coaches);
    });
  }, [companyCoaches]);

  useEffect(() => {
    companyCoachesInput(0).then((companyCoaches) => {
      setCompanyCoaches(companyCoaches);
    });
  }, []);

  if (isAdmin) {
    return (
      <div className="content">
      <CoachesIntroBar/>
      <div className="wrapper row "> <AdminCoachesCatalog coaches={coaches} setCoaches={setCompanyCoaches} /></div>
    </div>   
    );
  }
  return (
    <div className="content">
      <CategoriesAndLanguageMenu atPage="Coaches" />
      <div className="wrapper row">{returnCatalog()}</div>
    </div>
  );
}

