import { useState } from 'react';
import { Route } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompanyOwnerSidebar from './components/CompanyOwnerViews/CompanyOwnerSidebar/CopmanyOwnerSidebar'
import CompanyCoaches from './components/CompanyOwnerViews/CompanyCoaches/CompanyCoaches'
import Home from './components/Home';
import Courses from './components/Courses/Courses';
import Coaches from './components/Coaches/Coaches';
import Layout from './components/Shared/Layout';
import Admin from './components/Admin/Admin';

import IdentityContext from './Context/IdentityContext';


function App() {
  const [user, setUser] = useState({});
  return (
    <IdentityContext.Provider value={{ user, setUser }}>
      <>

      <Layout>
        <Route exact path='/' component={Home}/>
        <Route exact path='/Courses' component={Courses}/>
        <Route exact path='/Coaches' component={Coaches}/>
        <Route exact path='/Admin' component={Admin}/>
        {/* <AuthorizeRoute path='/fetch-data' component={FetchData} /> */}
      </Layout>

      </>
    </IdentityContext.Provider >
  );
}

export default App;
