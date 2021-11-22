import { NavLink } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux"; 
import { ReactReduxContext } from 'react-redux'

import { clearMessage } from "../../../actions/message";

import { history } from "../../../helpers/history"; 

import Logo from '../../../assets/logo-NoBg.png';
import UserProfilePic from '../../../assets/userProfilePic.png';
import './Header.css';

import {
	LOGOUT,
	CHECK_CURRENT_STATE
  } from "../../../actions/types";
  

function Header() { 
	const [isActive, setisActive] = useState(false);   

	const { store } = useContext(ReactReduxContext)
    var {isLoggedIn, user} = store.getState().auth;

	const dispatch = useDispatch();
  
	useEffect(() => {	
	  history.listen((location) => {
		dispatch(clearMessage()); // clear message when changing location
	  });
	}, [user, isLoggedIn, dispatch]);
	
	return ( 
		<header className="Header site-header"> 
			<div className="header-wrapper navbar navbar-default ml-5">
				<div className="navbar header-inner navbar-light shadow bg-light fixed-top">
				<nav className="nav container navbar-center navbar-expand-lg"> 
					<section className="logoArt mr-auto pl-lg-1">
						<NavLink to="/" className="logoArt-href">
							<img src={Logo} alt="LOGO" />
						</NavLink>
					</section>

					<section className="collapse navbar-collapse ml-auto" id="navbar4">
							<ul className="navbar-nav ml-auto pl-lg-4 d-flex justify-content-end ms-auto w-50">
							<article className="container justify-content-around d-flex">
								<li className="nav-item px-lg-2  text-decoration-none">
									<NavLink to="/Courses" className="nav-link font-weight-bold mt-2" exact={true}>
										<b>Courses</b>
									</NavLink>
								</li>

								<li className="nav-item px-lg-2 text-decoration-none">
									<NavLink to="/Coaches" className="nav-link font-weight-bold mt-2" exact={true}>
										<b>Coaches</b>
						</NavLink>
								</li>

									<li className="nav-item px-lg-3 text-decoration-none d-flex my-auto">
										<NavLink to="/LangBg" className="nav-link font-weight-bold border-right p-0 pr-2 langBg" exact={true}>
											BG
							</NavLink>										
										<NavLink to="/LangEn" className="nav-link font-weight-bold p-0 pl-2 me-2" exact={true}>
											<b>EN</b>
							</NavLink>
								</li>
							</article>
   
							{isLoggedIn ? (
                                <div className="navbar-nav ml-auto">
                                    <article className="d-flex justify-content-end" style={{ width: 10 +'em'}} id="userProfile">
									<li className="nav-item px-lg-2  text-decoration-none d-flex justify-content-end">
									  <NavLink to="/MyProfile" className="nav-link col-xl-5 p-2">
										<img src={UserProfilePic} alt="User" className="img-fluid rounded" ></img>
									  </NavLink>
								</li> 
								</article>
                                  <li className="nav-item">
									<NavLink to="/Logout" className="nav-link btn btn-secondary mt-2">
                                        LogOut
                                    </NavLink>
                                  </li>
                               </div>
                         ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
			                     <NavLink to="/Login" className="btn btn-outline-info font-weight-bold mt-2" exact={true}>
                                    <b>Login</b>
                                 </NavLink>
                                </li>
                            </div>
                          )}
						</ul>
					</section>

					<section>
						<article className="nav-item container">
							<div 
								onClick={() => {
									setisActive(!isActive);
								}}
								role="button"
								className={`navbar-burger burger ${isActive ? "is-active" : ""} navbar-toggler navbar-toggler-right border-0`}
								aria-label="menu"
								aria-expanded="false">
								<span className="navbar-toggler-icon"></span>
							</div>
						</article>
					</section>

						<div className={`collapse nav-bar navbar-burger burger ${isActive ? "show container" : ""}`} id="navbar4">
							<ul className="navbar-nav mr-auto pl-lg-4 justify-content-center w-100">
								<li className="nav-item px-lg-2">
									<NavLink to="/Language" className="nav-link text-center" exact={true}>
										<span className="d-inline-block d-lg-none icon-width"><i className="fas fa-globe-europe"></i></span>
								BG|EN
							</NavLink>
								</li>
								<li className="nav-item px-lg-2">
									<NavLink className="nav-link text-center" to="/Courses"><span className="d-inline-block d-lg-none icon-width"><i className="fas fa-spa"></i></span>Courses</NavLink>
								</li>
								<li className="nav-item px-lg-2">
									<NavLink className="nav-link text-center" to="/Coaches"><span className="d-inline-block d-lg-none icon-width">
										<i className="fas fa-chalkboard-teacher"></i></span>Coaches</NavLink>
								</li>
								<li className="nav-item px-lg-2">
									<NavLink className="nav-link text-center" to="/MyProfile"><span className="d-inline-block d-lg-none icon-width">
										<i className="far fa-user"></i></span>My Profile</NavLink>
								</li>
							</ul>
						</div> 
			 	</nav>
			</div>
			</div> 
		</header > 
	);
}

export default Header;