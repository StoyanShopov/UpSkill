import { useState,useEffect } from 'react';
import { Route } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyOwnerSidebar from './components/CompanyOwnerViews/CompanyOwnerSidebar/CopmanyOwnerSidebar'
import CompanyCoaches from './components/CompanyOwnerViews/CompanyCoaches/CompanyCoaches'
import CoursesCard from './components/CoursesCard/CoursesCard';
import EmployeesPositionCard from './components/EmployeesPositionCard/EmployeesPositionCard';
import Home from './components/Home';
import Courses from './components/Courses/Courses';
import Coaches from './components/Coaches/Coaches'; 
import Login from './components/Login/Login'; 
 import Register from './components/Register/Register';
import AddCompany from "./components/Companies/AddCompany/AddCompany";
import CompanyDetails from "./components/Companies/CompanyDetails/CompanyDetails";
import EditCompany from "./components/Companies/EditCompany/EditCompany";
import {removeCompanyHandler} from "../src/services/companyService";
import Layout from './components/Shared/Layout'; 
import CompanyList from "./components/Companies/CompaniesCatalog/CompanyList";
import store from './store';    

import IdentityContext from './Context/IdentityContext';


function App() {
  const [user, setUser] = useState({});


  return (
     <IdentityContext.Provider  store={store}> 
      <Layout> 
          <Route exact path='/' component={Home}/>
          <Route exact path='/Courses' component={Courses}/>
          <Route exact path='/Coaches' component={Coaches}/>  
          <Route exact path='/Register' component={Register} />  
          <Route exact path='/Login' component={Login}/>   
          <Route exact path='/AddCompany' component={AddCompany}/>   
          <Route exact path='/CompanyList'  render={(props)=> (<CompanyList {...props} getCompanyId = {removeCompanyHandler}/>)}/>   
          <Route exact path='/Admin/Company/:id' component={CompanyDetails}/>   
          <Route exact path="/Admin/Companies/edit" component={EditCompany}/>  
      </Layout>

      
   </IdentityContext.Provider >
  );
}

export default App;
