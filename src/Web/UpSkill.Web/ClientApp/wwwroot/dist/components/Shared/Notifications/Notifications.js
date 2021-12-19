var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useEffect, useContext } from 'react';

import notificationContext from "../../../Context/NotificationContext";

import './Notifications.css';

function Notifications(_ref) {
    var state = _ref.state,
        message = _ref.message;

    var _useContext = useContext(notificationContext),
        _useContext2 = _slicedToArray(_useContext, 2),
        notification = _useContext2[0],
        setNotification = _useContext2[1];

    useEffect(function () {

        setTimeout(function () {
            setNotification({ type: 'CLEAR_MESSAGE' });
        }, 6000);
    }, [state, setNotification]);

    var closeNotification = function closeNotification() {
        setNotification({ type: 'CLEAR_MESSAGE' });
    };

    return React.createElement(
        'div',
        { className: 'noti-container' },
        React.createElement(
            'div',
            { className: 'noti-wrapper' },
            React.createElement(
                'div',
                { className: notification.type + ' ' + notification.state + ' notification' },
                React.createElement(
                    'p',
                    null,
                    message
                ),
                React.createElement(
                    'button',
                    { className: 'close-btn', onClick: function onClick() {
                            return closeNotification();
                        } },
                    '\u2716'
                )
            )
        )
    );
}

export default Notifications;