import React from "react"; 
import { Route } from "react-router-dom";
import { Provider } from 'react-redux'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Courses from './components/Courses/Courses';
import Coaches from './components/Coaches/Coaches'; 
import Login from './components/Login/Login'; 
import Register from './components/Register/Register';
import Layout from './components/Shared/Layout'; 
import store from './store';    

const AppWrapper = () => {   

  return (
    <Provider store={store}> 
      <Layout> 
          <Route exact path='/' component={Home}/>
          <Route exact path='/Courses' component={Courses}/>
          <Route exact path='/Coaches' component={Coaches}/>  
          <Route exact path='/Register' component={Register} />  
          <Route exact path='/Login' component={Login}/>   
      </Layout>
    </Provider>
  )
}

function App() {    
  return (
    <AppWrapper/> 
  );
}

export default App;
