import React from 'react';
import { Button } from 'react-bootstrap'; 

import CoursesCard from './CoursesCard/CoursesCard';

import './CoursesCatalog.css';   

export default function CoursesCatalog({courses}) {
    return (
        <div className="container"> 
            <div className="row list-unstyled myProfile-courses-list">
                    {courses.map((course) => ( 
                        <div className="col-sm-5 text-align-center" key={course.id}>      
                        <CoursesCard
                            key={course.id} 
                            coursesDetails={course}
                        >
                            <Button className="courses-cardButton">Compete</Button>
                        </CoursesCard>
                        </div>
                    ))}
            </div> 
        </div>
    );
}
