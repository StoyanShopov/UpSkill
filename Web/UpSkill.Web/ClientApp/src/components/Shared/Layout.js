import React from 'react';
import NavMenu from './Header/Header';
import FooterMenu from './Footer/Footer';

import './Layout.css';

export default function Layout(props) {
  return (
      <>
        <NavMenu />
                <div className="container paddingTopContent">
                    {props.children}
                </div>
        <FooterMenu/>
      </>
    );  
}
