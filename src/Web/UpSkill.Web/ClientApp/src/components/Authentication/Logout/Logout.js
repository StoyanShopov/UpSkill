import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useLocation} from "react-router-dom";

import notificationContext from "../../../Context/NotificationContext";
import chatContext from "../../../Context/ChatContext";

import { logout } from "../../../actions/auth";  

import {
  LOGOUT,
} from "../../../actions/types";

const Logout = (props) => {
  const { isLoggedIn } = useSelector(state => state.auth);
  let [notification, setNotification] = useContext(notificationContext);
	const [joinRoom, sendMessage, closeConnection, messages, setMessages, connection] = useContext(chatContext);	

  const dispatch = useDispatch();
  const location = useLocation();   

  useEffect(() => {
    if(!isLoggedIn){
        props.history.push("/Login");        
    }
    logout()
        .then(async () => { 
          dispatch({
            type:LOGOUT,
          });

          props.history.push("/home");
          window.location.reload(false);
          localStorage.removeItem("user");                
          setNotification({type:'LOGOUT', payload: `Goodbye !`});
        })
        .catch(() => {
          props.history.push("/Login");           
          window.location.reload(false);
        });
  }, []);
   
  return (
    <div></div>
  );
}

export default Logout;
