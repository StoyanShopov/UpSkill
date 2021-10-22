import React, {useReducer} from "react"; 
import { Route } from "react-router-dom";
import { Provider } from 'react-redux'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Layout from './components/Shared/Layout'; 
import Notifications from './components/Shared/Notifications/Notifications';
import Admin from './components/Admin/Admin';
import Courses from './components/Courses/Courses';
import Coaches from './components/Coaches/Coaches'; 
import CompanyOwner from './components/CompanyOwnerViews/CompanyOwner'; 
import Login from './components/Authentication/Login/Login'; 
import Logout from './components/Authentication/Logout/Logout'; 
import Register from './components/Authentication/Register/Register';
import Layout from './components/Shared/Layout'; 
import Notifications from './components/Shared/Notifications/Notifications';
import Employee from './components/Employee/Employee'; 
import Auth from "./reducers/auth";
import NotificationContext from "./Context/NotificationContext";
import store from './store';    

const AppWrapper = (props) => {   
  const [notification, setNotification ] = useReducer(Auth, {type: '', state: 'none', message: ''});
  
  return (
    <Provider store={store}> 
     <NotificationContext.Provider value={[notification, setNotification]} >
      <Layout> 
        <Notifications state={notification.state} message={notification.message} />
          {props.children}   
      </Layout>
      </NotificationContext.Provider >
    </Provider>
  )
}

function App() {    
  return (
    <AppWrapper>
      <Route exact path='/' component={Home}/>          
          <Route exact path='/Admin' component={Admin}/>
          <Route exact path='/Courses' component={Courses}/>
          <Route exact path='/Coaches' component={Coaches}/>  
          <Route exact path='/Employee' component={Employee}/>
          <Route exact path='/MyProfile' component={CompanyOwner}/>
          <Route exact path='/Register' component={Register} />  
          <Route exact path='/Login' component={Login}/>
          <Route exact path='/Logout' component={Logout}/>
      </AppWrapper> 
  );
}

export default App;
