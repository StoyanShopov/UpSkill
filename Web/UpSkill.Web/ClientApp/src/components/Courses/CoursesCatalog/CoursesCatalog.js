import { useState, useEffect } from 'react';
import CourseCard from './CourseCard/CourseCard';

import './CoursesCatalog.css';

import { getCourses } from '../../../services/courseService';

export default function CoursesCatalog() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses(0).then((courses) => {
      setCourses(courses);
    });
  }, []);

  return (
    <>
      {/* <div className="container"> 
            <div className="row list-unstyled courses-list"> 
                    {courses.map((course) => ( 
                        <div className="col-sm-5 text-align-center" key={course.id}>      
                        <CourseCard
                            key={course.id} 
                            coursesDetails={course}
                        >
                            <Button className="courses-cardButton">Compete</Button>
                        </CourseCard>
                        </div>
                    ))}
            </div> 
        </div> */}

      <div className="container">
        <div className="row list coaches-list" >
          {courses.map((course) => (
            <div className="col-sm-4 text-align-center" style={{ marginLeft: 1 }}
               key={course.id}>
              <CourseCard 
                key={course.id}
                courseName={course.courseName}
                coachName={course.coachName}
                imageName={course.imageName}
              ></CourseCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
