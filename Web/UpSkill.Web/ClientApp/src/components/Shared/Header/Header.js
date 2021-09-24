import { NavLink } from "react-router-dom";
import React, { useState } from 'react'

import Logo from '../../../assets/logo-NoBg.png';
import UserProfilePic from '../../../assets/userProfilePic.png';
import './Header.css';

function Header() {
	const [isActive, setisActive] = useState(false);


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
									<NavLink to="/Courses" className="nav-link font-weight-bold" exact={true}>
										<b>Courses</b>
									</NavLink>
								</li>

								<li className="nav-item px-lg-2 text-decoration-none">
									<NavLink to="/Coaches" className="nav-link font-weight-bold" exact={true}>
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

								<article className="d-flex justify-content-end" style={{ width: 10 +'em'}} id="userProfile">
									<li className="nav-item px-lg-2  text-decoration-none d-flex justify-content-end">
										<NavLink to="/MyProfile" className="nav-link col-xl-5 p-0">
										<img src={UserProfilePic} alt="User Picture" className="img-fluid rounded"></img>
									</NavLink>
								</li>

							</article>

						</ul>
					</section>

					<section>
						<article className="nav-item container">
							<a
								onClick={() => {
									setisActive(!isActive);
								}}
								role="button"
								className={`navbar-burger burger ${isActive ? "is-active" : ""} navbar-toggler navbar-toggler-right border-0`}
								aria-label="menu"
								aria-expanded="false">
								<span className="navbar-toggler-icon"></span>
							</a>
						</article>
					</section>

						<div className={`collapse nav-bar navbar-burger burger ${isActive ? "show container" : ""}`} id="navbar4">
							<ul className="navbar-nav mr-auto pl-lg-4 justify-content-center w-100">
								<li className="nav-item px-lg-2">
									<NavLink to="/Ask" className="nav-link text-center" exact={true}>
										<span className="d-inline-block d-lg-none icon-width"><i className="fas fa-globe-europe"></i></span>
								BG|EN
							</NavLink>
								</li>
								<li className="nav-item px-lg-2">
									<NavLink className="nav-link text-center" to=""><span className="d-inline-block d-lg-none icon-width"><i className="fas fa-spa"></i></span>Courses</NavLink>
								</li>
								<li className="nav-item px-lg-2">
									<NavLink className="nav-link text-center" to=""><span className="d-inline-block d-lg-none icon-width">
										<i className="far fa-user"></i></span>Coaches</NavLink>
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