import React from 'react';

import { Link } from 'react-router-dom'; 

import CoursesCard from './CoursesCard/CoursesCard';

import './CoursesCatalog.css';    

export default function CoursesCatalog({ courses }) {
    return (
        <div className="container"> 
            <div className="row list-unstyled courses-list"> 
                    {courses.map((course) => ( 
                        <div className="col-sm-5 text-align-center" key={course.id}>      
                        <CoursesCard
                            key={course.id} 
                            coursesDetails={course}
                        >
                            <Link to={`/DetailsContent${course.id}`} className="courses-cardButton">Compete</Link>
                        </CoursesCard>
                        </div>
                    ))}
            </div> 
        </div>
    );
}
