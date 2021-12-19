import React, { useReducer, useEffect } from 'react';
import { Route, useLocation, Switch } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Layout from './components/Shared/Layout';
import Notifications from './components/Shared/Notifications/Notifications';
import Admin from './components/Admin/Admin';
import Courses from './components/Courses/Courses';
import Coaches from './components/Coaches/Coaches';
import MyProfile from './components/MyProfile/MyProfile';
import Login from './components/Authentication/Login/Login';
import Logout from './components/Authentication/Logout/Logout';
import Register from './components/Authentication/Register/Register';
import AddCompany from './components/Companies/AddCompany/AddCompany';
import CompanyDetails from './components/Companies/CompanyDetails/CompanyDetails';
import EditCompany from './components/Companies/EditCompany/EditCompany';
import CompanyList from './components/Companies/CompaniesCatalog/CompanyList';
import { removeCompanyHandler } from '../src/services/companyService';
import NotificationContext from './Context/NotificationContext';
import IdentityContext from './Context/IdentityContext';
import SignalRHubClient from './components/Chat/SignalRHubClient';
import ZoomHubClient from './components/Zoom/ZoomHubClient';
import Auth from './reducers/auth';
import instance from './services/instance';

import UpdateEmployee from './components/MyProfile/Employee/UpdateEmployee/UpdateEmployee';

import store from './store';
import AdminCourses from './components/Admin/Courses/AdminCourses/AdminCourses';
import PromoteDemote from './components/Admin/AdminPromoteDemote';
import CourseDetailsContent from './components/Courses/CoursesDetailsContent/CoursesDetailsContent';

import { CHECK_CURRENT_STATE } from './actions/types';
import { useState } from 'react';

const AppWrapper = (props) => {
  const [notification, setNotification] = useReducer(Auth, {
    type: '',
    state: 'none',
    message: '',
  });

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: CHECK_CURRENT_STATE,
    });
    setLoading(false);
  }, []);

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      <IdentityContext.Provider value={[loading, setLoading]}>
        <ZoomHubClient>
          <SignalRHubClient>
            <Layout>
              <Notifications
                state={notification.state}
                message={notification.message}
              />
              {props.children}
            </Layout>
          </SignalRHubClient>
        </ZoomHubClient>
      </IdentityContext.Provider>
    </NotificationContext.Provider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Admin" component={Admin} />
          <Route exact path="/Admin/Courses" component={AdminCourses} />
          <Route exact path="/Courses" component={Courses} />
          <Route exact path="/Coaches" component={Coaches} />
          <Route path="/MyProfile" component={MyProfile} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Logout" component={Logout} />
          <Route exact path="/AddCompany" component={AddCompany} />
          <Route
            exact
            path="/CompanyList"
            render={(props) => (
              <CompanyList {...props} getCompanyId={removeCompanyHandler} />
            )}
          />
          <Route exact path="/Admin/Company/:id" component={CompanyDetails} />
          <Route exact path="/Admin/Companies/edit" component={EditCompany} />
          <Route exact path="/Admin/PromoteDemote" component={PromoteDemote} />
          <Route exact path="/refreshToken/" />
          <Route
            exact
            path="/Course/:id"
            render={(props) => <CourseDetailsContent {...props} />}
          />
        </Switch>
      </AppWrapper>
    </Provider>
  );
}

export default App;
