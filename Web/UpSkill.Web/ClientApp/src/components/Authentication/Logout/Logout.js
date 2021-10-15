import React, { useState, useRef, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom'; 

import notificationContext from "../../../Context/NotificationContext";

import { logout } from "../../../actions/auth";  

const Logout = (props) => {
  const { isLoggedIn } = useSelector(state => state.auth);
  let [notification, setNotification] = useContext(notificationContext);

  const dispatch = useDispatch();

  useEffect(() => {
    if(!isLoggedIn){
        props.history.push("/Login");        
    }

    dispatch(logout())
        .then(() => {
          props.history.push("/");
          setNotification({type:'LOGOUT', payload: `Goodbye !`});
        })
        .catch(() => {
          props.history.push("/");
        });
  }, []);
   
  return (
    <div></div>
  );
}

export default Logout;
