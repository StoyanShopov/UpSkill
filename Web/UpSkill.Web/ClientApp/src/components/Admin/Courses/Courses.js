import { useState, useEffect } from "react";
import { getCourses } from "../../../services/courseService";
import './Courses.css'

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses(0).then((courses) => {
      setCourses(courses);
    });
  }, []);

  return (
    <div>
      <div>
        <mark>Courses</mark> are currently <span className='bold-element'>{courses.length}</span>
      </div>
      
    </div>
  );
}
