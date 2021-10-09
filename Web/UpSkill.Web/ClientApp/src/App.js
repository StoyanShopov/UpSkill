import { useState } from 'react';
import { Route } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import CompanyOwner from './components/CompanyOwnerViews/CompanyOwner';
import Home from './components/Home';
import Courses from './components/Courses/Courses';
import Coaches from './components/Coaches/Coaches';

import Layout from './components/Shared/Layout';

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
        <Route exact path='/MyProfile' component={CompanyOwner}/>
        {/* <AuthorizeRoute path='/fetch-data' component={FetchData} /> */}
      </Layout>

      </>
    </IdentityContext.Provider >
  );
}

export default App;
