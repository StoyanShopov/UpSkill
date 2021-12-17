import React, { useState, useContext } from "react";
import notificationContext from "../../Context/NotificationContext";
import ZoomContext from "../../Context/ZoomContext";

import { createRoom } from "../../services/coachService";

import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Base_URL } from "../../utils/baseUrlConstant";

export default function ZoomHubClient(props) {
    const [connection, setConnection] = useState();
    const [notification, setNotification] = useContext(notificationContext);

    const systemLog = "SYSTEM";

    const joinCourses = async () => {
      try {
        let token = localStorage.getItem("token");

        const connection = new HubConnectionBuilder()
          .withUrl(`${Base_URL}zoom?token=${token}`)
          .configureLogging(LogLevel.Information)                
          .build();
  
        connection.on("ReceiveMessage", receiveMessage)
        connection.on("ReceiveInviteMessage", receiveInviteMessage)
        
        connection.onclose(e => {
          setConnection();
        })
  
        await connection.start();       
        await connection.invoke("JoinCourses");                

        setConnection(connection);
      } catch (e) {
        console.log(e);
      }
    }
    
    const startRoom = async (e) =>
      {
        e.preventDefault();

        let courseId = e.target[0].value;
        if(!courseId) return;

        let user =  await getCurrentUserConnection();
        let hostUrl = await createRoom(courseId, user);
        let messageHost = "You have created a room, please join it at:";

        receiveHostMessage(messageHost, hostUrl);

        return hostUrl;
      };
  
    const closeConnection = async () => {
      try {
        if (!connection) return;
        await connection.stop();
      } catch (e) {
        console.log(e);
      }
    }
  
    const receiveMessage = async (messageName, message) => {
        try {
          if(messageName === systemLog){
            setNotification({type:'LOGIN_SUCCESS', payload: message})
          } 
       } catch (e) {
        console.log(e);
      }
    }
  
      const sendJoinMessage = async (courseId) => {
      try {
        await connection.invoke("SendJoinMessage", courseId);
      } catch (e) {
        console.log(e);
      }
    }

    const receiveInviteMessage = async (message, joinUrl) => {
      try {
          setNotification({type:'SET_WARNING_MESSAGE', payload: {message, link:joinUrl}})
     } catch (e) {
      console.log(e);
      }
    }

    const receiveHostMessage = async (message, hostUrl) => {
        try {
            setNotification({ type: 'SET_WARNING_MESSAGE', payload: { message, link: hostUrl } })
        } catch (e) {
            console.log(e);
        }
    }
    
    const getCurrentUserConnection = () => {
      try {
          return connection.connection.connectionId;
        } catch (e) {
        console.log(e);
      }
    }

    return (
        <div>
            <ZoomContext.Provider value={[joinCourses, sendJoinMessage, startRoom, receiveInviteMessage, receiveMessage, closeConnection, connection]} >
            {props.children}
        </ZoomContext.Provider >
        </div>
    );
}
