var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import notificationContext from "../../../Context/NotificationContext";

import { logout } from "../../../actions/auth";

var Logout = function Logout(props) {
  var _useSelector = useSelector(function (state) {
    return state.auth;
  }),
      isLoggedIn = _useSelector.isLoggedIn;

  var _useContext = useContext(notificationContext),
      _useContext2 = _slicedToArray(_useContext, 2),
      notification = _useContext2[0],
      setNotification = _useContext2[1];

  var dispatch = useDispatch();

  useEffect(function () {
    if (!isLoggedIn) {
      props.history.push("/Login");
    }

    dispatch(logout()).then(function () {
      props.history.push("/");
      localStorage.removeItem("user");
      setNotification({ type: 'LOGOUT', payload: "Goodbye !" });
    }).catch(function () {
      props.history.push("/Login");
    });
  }, []);

  return React.createElement("div", null);
};

export default Logout;