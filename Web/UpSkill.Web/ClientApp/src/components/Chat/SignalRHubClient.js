import React, { useState, useContext } from "react";
import ChatContext from "../../Context/ChatContext";
import notificationContext from "../../Context/NotificationContext";



import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';


function SignalRHubClient(props) {
    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [username, setUserName] = useState('');
    const [notification, setNotification] = useContext(notificationContext);
  
    const joinRoom = async (name) => {
      try {
        const connection = new HubConnectionBuilder()
          .withUrl("https://localhost:44319/chat")
          .configureLogging(LogLevel.Information)                
          .build();
  
        connection.on("ReceiveMessage", receiveMessage)
        
        connection.onclose(e => {
          setConnection();
          setMessages([]);
        })
  
        setUserName(name || 'Anonymous');
        await connection.start();
        await connection.invoke("JoinRoom", { name });
        let lastMessages = await connection.invoke("GetLastMessages");
  
        console.log(lastMessages);
  
        await Array.prototype.reverse.call(lastMessages).forEach(m => {
          receiveMessage(m.name,m.message,m.currentTime, name);        
        });
  
        setConnection(connection);
  
      } catch (e) {
        console.log(e);
      }
    }
  
    const closeConnection = async () => {
      try {
        if (!connection) return;
        await connection.stop();
      } catch (e) {
        console.log(e);
      }
    }
  
    const receiveMessage = async (messageName, message, currentTime, name) => {
        try {
          if(messageName === "Chat Bot"){
            setNotification({type:'LOGIN_SUCCESS', payload: `${name} has joined the chat!`})
          } else{
                setMessages(messages => [...messages, {
                    name: messageName,
                    message,
                    currentTime,
                    isMine: name === messageName,
                }]);
          }
        console.log('message received: ', message);    
       } catch (e) {
        console.log(e);
      }
    }
  
  
      const sendMessage = async (message) => {
      try {
          await connection.invoke("Send", message, username);
      } catch (e) {
        console.log(e);
      }
    }
  
    
    return (
        <div>
            <ChatContext.Provider value={[joinRoom, sendMessage, closeConnection, messages, setMessages, connection]} >
            {props.children}
        </ChatContext.Provider >
        </div>
    );
}

export default SignalRHubClient;