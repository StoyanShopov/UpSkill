import { useEffect, useContext } from 'react';

import notificationContext from "../../../Context/NotificationContext";

import './Notifications.css';

function Notifications({ state, message }) {
    let [notification, setNotification] = useContext(notificationContext);

    useEffect(() => {
        
        setTimeout(() => {
            setNotification({type:'CLEAR_MESSAGE'});
        }, 6000);

    }, [state,setNotification]);


    const closeNotification = () => {
        setNotification({type: 'CLEAR_MESSAGE'})
    }

    return (
        <div className="noti-container">
            <div className="noti-wrapper">
                <div className={`${notification.type} ${notification.state} notification`}>
                    <p>{message}</p>
                    <button className="close-btn" onClick={() => closeNotification()}>✖</button>
                </div>
            </div>
        </div>
    );
}

export default Notifications;
