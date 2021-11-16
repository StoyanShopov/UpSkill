import React, { useEffect, useState } from 'react';
import './Coaches-Card.css';
import { Badge } from 'react-bootstrap';

export default function CoachesCard(props) {
    var displaySession = props.displaySession,
        displayPrice = props.displayPrice,
        _props$coachDetails = props.coachDetails,
        fullName = _props$coachDetails.fullName,
        company = _props$coachDetails.company,
        coachField = _props$coachDetails.coachField,
        imageUrl = _props$coachDetails.imageUrl,
        imageMock = _props$coachDetails.imageMock,
        price = _props$coachDetails.price,
        session = _props$coachDetails.session;

    // const [Image, setImage] = useState();      

    // function loadImage (imageName) {
    //         import(`${imageMock}`)
    //             .then(img=> setImage(img.default));        
    //     };

    // useEffect(() => {
    //     loadImage(imageMock);
    // }, []);


    return React.createElement(
        'div',
        { className: 'coaches-Card' },
        React.createElement(
            'div',
            { className: 'coaches-image-wrapper' },
            React.createElement(
                'div',
                { className: 'coaches-image-wrapper-bg' },
                React.createElement('img', { src: imageUrl, className: 'coaches-image', alt: 'text' })
            )
        ),
        React.createElement(
            'div',
            { className: 'coaches-content w-75' },
            React.createElement(
                'div',
                { className: 'coachInfo d-flex justify-content-between mt-3' },
                React.createElement(
                    'span',
                    { className: 'coaches-coachField' },
                    coachField
                ),
                React.createElement(
                    'span',
                    { className: 'coaches-fullName' },
                    fullName
                )
            ),
            React.createElement(
                'div',
                { className: 'companyAndPriceInfo d-flex justify-content-between' },
                displaySession && React.createElement(
                    'span',
                    { className: 'coaches-session' },
                    session
                ),
                displayPrice && React.createElement(
                    'span',
                    { className: 'coaches-coachPrice' },
                    price,
                    '\u20AC per session'
                ),
                React.createElement(
                    'h6',
                    null,
                    React.createElement(
                        Badge,
                        { bg: 'secondary' },
                        company
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'btn-wrapper' },
            props.children
        )
    );
}