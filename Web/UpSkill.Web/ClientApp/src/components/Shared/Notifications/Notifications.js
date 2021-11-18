import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import notificationContext from "../../../Context/NotificationContext";

import './Notifications.css';

function Notifications({ state, message }) {
    let [notification, setNotification] = useContext(notificationContext);

    useEffect(() => {
        setTimeout(() => {
            setNotification({type:'CLEAR_MESSAGE'});
        }, 7000);

    }, [setNotification]);


    const closeNotification = () => {
        setNotification({type: 'CLEAR_MESSAGE'})
    }

    return (
        <div className="noti-container">
            <div className="noti-wrapper">
                <div className={`${notification.type} ${notification.state} notification table-borderless`}>
                    <p className="row">
                    <span className="col">{message}</span>
                    {notification.link
                    ? <a href={notification.link} className="link col"  target="_blank" rel="noreferrer">JOIN NOW</a>
                    : null} 
                    </p>                    
                    <button className="close-btn" onClick={() => closeNotification()}>✖</button>
                </div>
            </div>
        </div>
    );
}

export default Notifications;
