import React, {useEffect} from 'react';

import { enableBodyScroll } from '../../../utils/utils';
import { removeCourseMessage, removeCoachMessage } from '../../../utils/webConstants';

import "./RemovePopup.css";

function RemovePopup(props) {
    const atPage = props.atPage;

    function closePopup() {
        enableBodyScroll();

        let buttonElements = document.getElementsByClassName('companyOwner-cardBtn');
        let imageElements = document.getElementsByClassName('coaches-image');
        imageElements[0].style.position = "relative";
        imageElements[1].style.position = "relative";
        imageElements[2].style.position = "relative";
        buttonElements[0].style.position = "relative";
        props.onRemove(false);
    }


    return (props.trigger) ? (
        <div>
            <div className="popup">
                <div className="popup-inner popup-inner-remove">
                    <div className="popup-Header">
                        <div className="closebtn d-flex justify-content-end p-2">
                            <button onClick={e => closePopup()} className="closebtn btn"><i className="fas fa-times"></i></button>
                        </div>
                        <div className="popup-Title p-4">
                            <h4>{atPage==="coaches"? removeCoachMessage : removeCourseMessage}</h4>
                        </div>
                    </div>
                  

                        <div className="addEmployee-actions d-flex p-5 d-flex justify-content-center">
                            <div className="addEmployee-actions-cancel-wrapper p-2">
                                <button onClick={e => closePopup()} className="addEmployee-actions-cancel btn-outline-primary px-4 fw-bold">Cancel</button>
                            </div>

                            <div className="addEmployee-actions-save-wrapper p-2">
                                <input type="submit" className="addEmployee-actions-confirm btn-primary px-4 fw-bold" value="Remove" />
                            </div>
                        </div>
                </div>
            </div>
        </div>
    ) : '';
}

export default RemovePopup;