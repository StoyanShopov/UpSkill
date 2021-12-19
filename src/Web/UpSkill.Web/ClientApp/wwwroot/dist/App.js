var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useReducer } from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';

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
import AddCompany from "./components/Companies/AddCompany/AddCompany";
import CompanyDetails from "./components/Companies/CompanyDetails/CompanyDetails";
import EditCompany from "./components/Companies/EditCompany/EditCompany";
import CompanyList from "./components/Companies/CompaniesCatalog/CompanyList";
import { removeCompanyHandler } from "../src/services/companyService";
import { removeEmployeeHandler } from "../src/services/employeeService";
import Auth from "./reducers/auth";
import NotificationContext from "./Context/NotificationContext";
import store from './store';
import AdminCourses from "./components/Admin/Courses/AdminCourses/AdminCourses";
import PromoteDemote from "./components/Admin/AdminPromoteDemote";

var AppWrapper = function AppWrapper(props) {
  var _useReducer = useReducer(Auth, {
    type: '',
    state: 'none',
    message: ''
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      notification = _useReducer2[0],
      setNotification = _useReducer2[1];

  return React.createElement(
    Provider,
    { store: store },
    React.createElement(
      NotificationContext.Provider,
      { value: [notification, setNotification] },
      React.createElement(
        Layout,
        null,
        React.createElement(Notifications, { state: notification.state, message: notification.message }),
        props.children
      )
    )
  );
};

function App() {
  return React.createElement(
    AppWrapper,
    null,
    React.createElement(Route, { exact: true, path: '/', component: Home }),
    React.createElement(Route, { exact: true, path: '/Admin', component: Admin }),
    React.createElement(Route, { exact: true, path: '/Admin/Courses', component: AdminCourses }),
    React.createElement(Route, { exact: true, path: '/Courses', component: Courses }),
    React.createElement(Route, { exact: true, path: '/Coaches', component: Coaches }),
    React.createElement(Route, { exact: true, path: '/MyProfile', component: MyProfile }),
    React.createElement(Route, { exact: true, path: '/Register', component: Register }),
    React.createElement(Route, { exact: true, path: '/Login', component: Login }),
    React.createElement(Route, { exact: true, path: '/Logout', component: Logout }),
    React.createElement(Route, { exact: true, path: '/AddCompany', component: AddCompany }),
    React.createElement(Route, { exact: true, path: '/CompanyList', render: function render(props) {
        return React.createElement(CompanyList, Object.assign({}, props, { getCompanyId: removeCompanyHandler }));
      } }),
    React.createElement(Route, { exact: true, path: '/Admin/Company/:id', component: CompanyDetails }),
    React.createElement(Route, { exact: true, path: '/Admin/Companies/edit', component: EditCompany }),
    React.createElement(Route, { exact: true, path: '/Admin/PromoteDemote', component: PromoteDemote })
  );
}

export default App;