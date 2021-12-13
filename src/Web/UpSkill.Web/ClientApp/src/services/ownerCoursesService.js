import axios from "axios"
import { Base_URL } from '../utils/baseUrlConstant';
const API_URL = Base_URL + "Owner/Courses/";
let data = [];

const getCourses = async (courseId, courseTitle, courseCoachFirstName, courseCoachLastName, courseFileFilePath) => {
  let token = localStorage.getItem("token");
  return await axios.get(API_URL + "getactivecourses", { headers: { "Authorization": `Bearer ${token}` } }, {
        courseId,
        courseTitle,
        courseCoachFirstName,
        courseCoachLastName,
        courseFileFilePath,
    })
        .then((response) => {
            data = response.data
            return data;
        });
};

const getAvailableCourses = async (courseId, courseTitle, courseCoachFirstName, courseCoachLastName, courseFileFilePath) => {
  let token = localStorage.getItem("token");
  return await axios.get(API_URL + "getavailablecourses", { headers: { "Authorization": `Bearer ${token}` } }, {
        courseId,
        courseTitle,
        courseCoachFirstName,
        courseCoachLastName,
        courseFileFilePath,
    })
        .then((response) => {
            data = response.data
            return data;
        });
};
const enableCourse = async (courseId) => {
  let token = localStorage.getItem("token");
  await axios.put(API_URL + "enable?id=" + courseId, { headers: { "Authorization": `Bearer ${token}` } });
};
const disableCourse = async (courseId) => {
  let token = localStorage.getItem("token");
  await axios.delete(API_URL + "disable?id=" + courseId, { headers: { "Authorization": `Bearer ${token}` } });
};

const serviceActions = {
    enableCourse,
    disableCourse,
    getCourses,
    getAvailableCourses
};

export default serviceActions;
