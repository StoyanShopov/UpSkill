import { useState } from 'react';
import { Route } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import IdentityContext from './Context/IdentityContext';
import CompanyOwnerSidebar from './components/CompanyOwnerViews/CompanyOwnerSidebar/CopmanyOwnerSidebar'
import CompanyCoaches from './components/CompanyOwnerViews/CompanyCoaches/CompanyCoaches'
import CoursesCard from './components/CoursesCard/CoursesCard';
import EmployeesPositionCard from './components/EmployeesPositionCard/EmployeesPositionCard';
import Home from './components/Home';
import Courses from './components/Courses/Courses';
import Layout from './components/Shared/Layout';


function App() {
  const [user, setUser] = useState({});
  return (
    <IdentityContext.Provider value={{ user, setUser }}>
      <>
      {/* 
          <CoursesCard></CoursesCard>
          <EmployeesPositionCard></EmployeesPositionCard>
       */}

      <Layout>
        <Route exact path='/' component={Home}/>
        <Route exact path='/Courses' component={Courses}/>
        {/* <AuthorizeRoute path='/fetch-data' component={FetchData} /> */}
        {/* <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} /> */}
      </Layout>

      </>
    </IdentityContext.Provider >
  );
}

export default App;
