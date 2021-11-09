import axios from 'axios';
import { Base_URL } from '../utils/baseUrlConstant';

const EMP_API_URL = Base_URL + 'Employee/Courses/';
const OWN_API_URL = Base_URL + 'Owner/Employees/';

const token = localStorage.getItem('token');

let data = [];

export const getCourses = (
  courseId,
  courseTitle,
  courseCoachFirstName,
  courseCoachLastName,
  courseFileFilePath
) => {
  return axios
    .get(
      EMP_API_URL + 'getAll',
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

const numberEmployeesToShow = 3;
let employees = [];

export const getAllEmployees = async (employee) => {
  return axios
    .get(
      OWN_API_URL + 'getAll',
      { headers: { Authorization: `Bearer ${token}` } },
      { employee }
    )
    .then((response) => {
      employees = [];
      response.data.map((x) => employees.push(x));
      return employees;
    });
};

export const getEmployeeWithEmail = async (currentPage) => {
  getAllEmployees();
  let arr = [];
  arr.push(
    ...employees.slice(
      0,
      currentPage * numberEmployeesToShow + numberEmployeesToShow
    )
  );

  return arr;
};

export const getEmployeesTotalCountCompanyOwner = async (uId) => {
  getAllEmployees();
  return employees.length;
};
