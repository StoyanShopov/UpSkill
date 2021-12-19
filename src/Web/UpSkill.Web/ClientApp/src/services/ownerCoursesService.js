import axios from "axios";
import { Base_URL } from "../utils/baseUrlConstant";
const API_URL = Base_URL + "Owner/Courses/";
let data = [];

const getCourses = async (
  courseId,
  courseTitle,
  courseCoachFirstName,
  courseCoachLastName,
  courseFileFilePath
) => {
  let token = localStorage.getItem("token");
  return await axios
    .get(
      API_URL + "getactivecourses",
      { headers: { Authorization: `Bearer ${token}` } },
      {
        courseId,
        courseTitle,
        courseCoachFirstName,
        courseCoachLastName,
        courseFileFilePath,

      }
    )
    .then((response) => {
      data = response.data;
      return data;
    });
};

const getAvailableCourses = async (
  courseId,
  courseTitle,
  courseCoachFirstName,
  courseCoachLastName,
  courseFileFilePath
) => {
  let token = localStorage.getItem("token");
  return await axios
    .get(
      API_URL + "getavailablecourses",
      { headers: { Authorization: `Bearer ${token}` } },
      {
        courseId,
        courseTitle,
        courseCoachFirstName,
        courseCoachLastName,
        courseFileFilePath,
      }
    )
    .then((response) => {
      data = response.data;
      return data;
    });
};

const enableCourse = async (courseId) => {
  let token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  let requestData = {
    courseId,
    companyOwnerEmail: user.email,
  };
  await axios.post(API_URL + "addCompanyToCourse", requestData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const disableCourse = async (courseId) => {
  let token = localStorage.getItem("token");
  await axios.delete(API_URL + "disable?id=" + courseId, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const serviceActions = {
  enableCourse,
  disableCourse,
  getCourses,
  getAvailableCourses,
};

export default serviceActions;
