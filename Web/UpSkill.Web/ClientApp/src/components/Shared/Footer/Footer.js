import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';

import FooterLOGO from '../../../assets/footerLOGO-NoBg.png';
import './Footer.css';

function FooterMenu() {
    return (
            <footer>
                <div className="slants">
                </div>
            <div className="content-wrapper container-fluid">
                <div className="content container contentFooter">
                    <div className="row justify-content-between">
                        <div className="col-md-4">
                            <h2><img src={FooterLOGO} alt="Footer Logo" className="w-25" /> upskill</h2>
                            <p className="pr-5 pt-3 pb-3">Upskill gives everyone the opportunity to grow professionally and develop into specialist in every field.</p>
                            <NavLink to="" className="btn btn-outline-light rounded-0 getStarted font-weight-bold pl-3 pr-3 pb-2 pt-2 fw-bolder">Get Started</NavLink>
                        </div>
                        <div className="col-md-3 mt-5 ml-auto">
                            <ul className="nav flex-column">
                                <h5 className="nav-brand px-3 m-1">Company</h5>
                                <li className="nav-item m-1"><NavLink to="" className="nav-link text-white">About us</NavLink></li>
                                <li className="nav-item m-1"><NavLink to="" className="nav-link text-white">Contact us</NavLink></li>
                                <li className="nav-item m-1"><NavLink to="" className="nav-link text-white">Privacy Policy</NavLink></li>
                                </ul>
                            </div>
                        <div className="col-md-3 mt-5">
                            <ul className="nav flex-column">
                                <h5 className="nav-brand px-3 m-1">Services</h5>
                                <li className="nav-item m-1"><NavLink to="" className="nav-link text-white">Courses</NavLink></li>
                                <li className="nav-item m-1"><NavLink to="" className="nav-link text-white">Coaches</NavLink></li>
                                <li className="nav-item m-1"><NavLink to="" className="nav-link text-white">Requests</NavLink></li>
                            </ul>
                        </div>
                        <div className="col-md-1 mt-5">
                            <ul className="nav flex-column mt-4">
                                <li className="nav-item m-1"><NavLink to="" className="nav-link text-white p-0"><i class="fab fa-facebook-square h3"></i></NavLink></li>
                                <li className="nav-item m-1"><NavLink to="" className="nav-link text-white p-0"><i class="fab fa-instagram h3"></i></NavLink></li>
                                <li className="nav-item m-1"><NavLink to="" className="nav-link text-white p-0"><i class="fab fa-linkedin h3"></i></NavLink></li>
                            </ul>
                        </div>
                    </div>                    
                </div>               
            </div>
            <div className="col-md-3 mt-5 ml-auto">
              <ul className="nav flex-column">
                <h5 className="nav-brand pl-3 m-1">Company</h5>
                <li className="nav-item m-1">
                  <NavLink to="" className="nav-link text-white">
                    About us
                  </NavLink>
                </li>
                <li className="nav-item m-1">
                  <NavLink to="" className="nav-link text-white">
                    Contact us
                  </NavLink>
                </li>
                <li className="nav-item m-1">
                  <NavLink to="" className="nav-link text-white">
                    Privacy Policy
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-md-3 mt-5">
              <ul className="nav flex-column">
                <h5 className="nav-brand pl-3 m-1">Services</h5>
                <li className="nav-item m-1">
                  <NavLink to="" className="nav-link text-white">
                    Courses
                  </NavLink>
                </li>
                <li className="nav-item m-1">
                  <NavLink to="" className="nav-link text-white">
                    Coaches
                  </NavLink>
                </li>
                <li className="nav-item m-1">
                  <NavLink to="" className="nav-link text-white">
                    Requests
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-md-1 mt-5">
              <ul className="nav flex-column mt-3">
                <li className="nav-item m-1">
                  <NavLink to="" className="nav-link text-white">
                    F
                  </NavLink>
                </li>
                <li className="nav-item m-1">
                  <NavLink to="" className="nav-link text-white">
                    I
                  </NavLink>
                </li>
                <li className="nav-item m-1">
                  <NavLink to="" className="nav-link text-white">
                    In
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        id="CopyRigthFooter"
        className="mt-4 border-top-2 border-white content-wrapper container-fluid"
      >
        <div className="content container">
          <div className="row d-flex justify-content-center">
            <span className="col-md-4 text-center">
              &copy; UpSkill {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterMenu;
