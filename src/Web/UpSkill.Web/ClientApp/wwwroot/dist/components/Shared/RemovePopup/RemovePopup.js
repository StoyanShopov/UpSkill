import React, { useEffect } from 'react';

import { enableBodyScroll } from '../../../utils/utils';
import { removeCourseMessage, removeCoachMessage } from '../../../utils/webConstants';

import "./RemovePopup.css";

function RemovePopup(props) {
    var atPage = props.atPage;

    function closePopup() {
        enableBodyScroll();

        var buttonElements = document.getElementsByClassName('companyOwner-cardBtn');
        var imageElements = document.getElementsByClassName('coaches-image');
        imageElements[0].style.position = "relative";
        imageElements[1].style.position = "relative";
        imageElements[2].style.position = "relative";
        buttonElements[0].style.position = "relative";
        props.onRemove(false);
    }

    return props.trigger ? React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { className: 'popup' },
            React.createElement(
                'div',
                { className: 'popup-inner popup-inner-remove' },
                React.createElement(
                    'div',
                    { className: 'popup-Header' },
                    React.createElement(
                        'div',
                        { className: 'closebtn d-flex justify-content-end p-2' },
                        React.createElement(
                            'button',
                            { onClick: function onClick(e) {
                                    return closePopup();
                                }, className: 'closebtn btn' },
                            React.createElement('i', { className: 'fas fa-times' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'popup-Title p-4' },
                        React.createElement(
                            'h4',
                            null,
                            atPage === "coaches" ? removeCoachMessage : removeCourseMessage
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'addEmployee-actions d-flex p-5 d-flex justify-content-center' },
                    React.createElement(
                        'div',
                        { className: 'addEmployee-actions-cancel-wrapper p-2' },
                        React.createElement(
                            'button',
                            { onClick: function onClick(e) {
                                    return closePopup();
                                }, className: 'addEmployee-actions-cancel btn-outline-primary px-4 fw-bold' },
                            'Cancel'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'addEmployee-actions-save-wrapper p-2' },
                        React.createElement('input', { type: 'submit', className: 'addEmployee-actions-confirm btn-primary px-4 fw-bold', value: 'Remove' })
                    )
                )
            )
        )
    ) : '';
}

export default RemovePopup;