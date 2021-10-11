import { useState, useEffect } from "react";
import EmployeeRow from "../EmployeesPositionCard/EmployeeRow/EmployeeRow";
import { getCourses } from "../../services/courseService";
import Courses from "./Courses/Courses";
import CoursesCatalog from "../Courses/CoursesCatalog/CoursesCatalog";

export default function Admin() {
  return (
    
      <ul className="list-group">
        <li className="list-group-item"><Courses /></li>
        <li className="list-group-item">Second item</li>
        <li className="list-group-item">Third item</li>
      </ul>
      
    
  );
}
