import React, { useState, useEffect } from 'react';

import { getCoachesSessionsForCompanyOwner } from '../../../../services/coachService';

import './CoachesSessionsTable.css';

function CoachesSessionsTable() {
    const [courses, setCourses] = useState([]);
    let [currentPage, setCurrentPage] = useState(0);
    let [currentMount, setCurrentMount] = useState('9');
    let [currentMountName, setCurrentMountName] = useState('');


    useEffect(() => {
        getCoachesSessionsForCompanyOwner('', currentPage, currentMount).then(mount=>{
            let [name, courses] = mount;
            setCourses(courses);
            setCurrentMountName(name);
        })
    }, [currentPage,currentMount]);

    function showMoreCourses() {
        let next = currentPage + 1;
        setCurrentPage(next);
        getCoachesSessionsForCompanyOwner('', next, currentMount).then(mount=>{
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
            <div className="ourTable">
                <div className="table-row table-monthHeading-wrapper header-CoachesSessions align-content-center">
                    <div className="cell px-2 table-monthHeading">
                    <button className="fw-bolder" onClick={e => changeMount(-1)}>{'<'}</button>
                    <span>{currentMountName}</span>
                    <button className="fw-bolder" onClick={e => changeMount(1)}>{'>'}</button>
                    </div>
                </div>
                <div className="table-row header-CoachesSessions">
                    <div className="cell cell-header">
                        Coach Name
                    </div>
                    <div className="cell cell-header">
                        Sessions
                    </div>
                </div>
                <div className="table-content d-flex ">

                    <div className="table-content-names w-50">
                        {courses.map(course => {
                            return (
                                <div className="table-row px-3" key={course.name}>
                                    <div className="cell cell-data-Employees-Coaches name-cell-data" data-title="Coach" href={course.enrolled}>
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
                        <span className="btn btn-link cell-data-Employees-Courses button-CoachesSessions" onClick={showMoreCourses}>View More</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoachesSessionsTable;
