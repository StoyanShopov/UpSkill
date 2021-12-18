import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import CoursesCatalog from "./CoursesCatalog/CoursesCatalog";
import serviceActions from "../../../../services/ownerCoursesService";

import "./OwnerCompanyCourses.css";

export default function CompanyOwnerCourses() {
  return (
    <>
      <div id="buttonContainer">
        <Button variant="outline-primary" id="btn" href="/Courses">
          <p id="manageButtonText">Manage</p>
        </Button>
      </div>
      <div className="wrapper">
        <CoursesCatalog />
      </div>
    </>
  );
}
