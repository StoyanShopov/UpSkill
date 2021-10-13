import React, { useState, useEffect } from 'react';

import { getCoursesForCompanyOwner } from '../../../../services/courseSevice';

import './CoursesEnrolledTable.css';

function CoursesEnrolledTable() {
    const [courses, setCourses] = useState([]);
    let [currentPage, setCurrentPage] = useState(0);
    let [currentMount, setCurrentMount] = useState('9');
    let [currentMountName, setCurrentMountName] = useState('');


    useEffect(() => {
        getCoursesForCompanyOwner('', currentPage, currentMount).then(mount=>{
            let [name, courses] = mount;
            setCourses(courses);
            setCurrentMountName(name);
        })
    }, [currentMount]);

    function showMoreCourses() {
        let next = currentPage + 1;
        setCurrentPage(next);
        getCoursesForCompanyOwner('', next, currentMount).then(mount=>{
            let [name, courses] = mount;
            setCourses(courses);
            setCurrentMountName(name);
        })
    }


    function changeMount(toMount) {
        let nextOrPrev = parseInt(currentMount) + toMount;
        setCurrentMount(nextOrPrev.toString());
    }

    return (
        <div className="wrap-table100 mt-5 shadow mb-5 bg-body rounded">
            <div className="table">
                <div className="table-row table-monthHeading-wrapper header-EmployeeCourse align-content-center">
                    <div className="cell px-2 table-monthHeading">
                    <button className="fw-bolder" onClick={e => changeMount(-1)}>{'<'}</button>
                    <span>{currentMountName}</span>
                    <button className="fw-bolder" onClick={e => changeMount(1)}>{'>'}</button>
                    </div>
                </div>
                <div className="table-row header-CoursesEnrolled">
                    <div className="cell cell-header">
                        Course Name
                    </div>                    
                    <div className="cell cell-header">
                        Enrolled
                    </div>
                </div>
                <div className="table-content d-flex ">

                    <div className="table-content-names w-50">
                        {courses.map(course => {
                            return (
                                <div className="table-row px-3" key={course.name}>
                                    <div className="cell cell-data-Employees-Courses name-cell-data" data-title="Course" href={course.enrolled}>
                                        {course.name}
                                    </div>
                                </div>);
                        })}
                    </div>

                    <div className="table-content-emails w-50">

                        {courses.map(course => {
                            return (
                                <div className="table-row px-3" key={course.name}>
                                    <div className="cell cell-data-Employees-Courses table-cell-data" data-title="EmployeesEnrolled">
                                        {course.enrolled}
                                    </div>
                                </div>);
                        })}
                    </div>

                </div>

                <div className="table-row">
                    <div className="table-viewMoreLink" data-mdb-ripple-color="dark">
                        <span className="btn btn-link cell-data-Employees-Courses" onClick={showMoreCourses}>View More</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoursesEnrolledTable;
