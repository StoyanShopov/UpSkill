import React, { useState, useEffect, useRef } from 'react';

import './Chat.css';

// This is not part of the project: TEST SERVICE
function Chat({ messages, sendMessage }) {
    const [message, setMessage] = useState('');
    const messageRef = useRef();

    useEffect(() => {
        if(messageRef && messageRef.current){
            const {scrollHeight, clientHeight} = messageRef.current;
            messageRef.current.scrollTo({left:0, top: scrollHeight - clientHeight, behavior: "smooth"});
        }
        var messageInput = document.getElementById("message");

        messageInput.addEventListener("keypress", function (event) {
            if (event.key === 13) {
                event.preventDefault();
                
                document.getElementById("sendmessage").click();
            }
        });
    }, [messages]);

    return (
        <div className="w-100 h-100 mt-4">
            <h2 className="text-center">Azure SignalR Group Chat</h2>
            <p className="text-center">Service Test</p>
            <div className="container w-100 h-100">
                <div id="messages" ref={messageRef} className="message-container">
                    {messages.map((m, index) =>
                        <div key={index} className={m.isMine ? "user-message" : "other-message"}>
                            <div className={m.isMine ? "bg-primary message px-2" : "bg-secondary message px-2"}>{m.message}</div>
                            <div className="from-user">{m.name} {m.currentTime}</div>
                        </div>
                    )}
                </div>
                <form onSubmit={e => {
                    e.preventDefault();
                    sendMessage(message);
                    setMessage('');
                }}>
                    <div className="w-100 h-50">
                        <input id="message"
                            className="w-100 p-2 mt-3"
                            placeholder="Type message and press Enter to send..."
                            onChange={e => setMessage(e.target.value)}
                            value={message}
                        ></input>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn-success pull-right px-3 m-1 fw-bold" id="sendmessage" type="submit" disabled={!message}>Send</button>
                    </div>
                </form>
            </div>
            <div className="modal alert alert-danger fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div>Connection Error...</div>
                            <div><strong>Hit Refresh/F5</strong> to rejoin. ;)</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Chat;