import axios from 'axios';
import { Base_URL } from '../utils/baseUrlConstant';

const EMP_API_URL = Base_URL + 'Employee/Courses/';
const OWN_API_URL = Base_URL + 'Owner/Employee/';

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
  await getAllEmployees();
  return employees.length;
};

export const getAllEmployees = async (employee) => {
  return axios
    .get(
      OWN_API_URL + 'getAllEmployees',
      { headers: { Authorization: `Bearer ${token}` } },
      { employee }
    )
    .then((response) => {
      employees = [];
      response.data.map((x) => employees.push(x));
      return employees;
    });
};

export const removeEmployeeHandler = async (id) => {
  console.log(id);
  return await axios.delete(Base_URL + `Owner/Employee?id=${id}`);
};
