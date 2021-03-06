import axios from "axios";
import { Base_URL } from "../utils/baseUrlConstant";

const EMP_API_URL = Base_URL + "Employee/Courses/";
const OWN_API_URL = Base_URL + "Owner/Employee/";

let data = [];

export const getCourses = async (course) => {
  let token = localStorage.getItem("token");
  return await axios
    .get(
      EMP_API_URL + "getAll",
      { headers: { Authorization: `Bearer ${token}` } },
      {
        course,
      }
    )
    .then((response) => {
      data = response.data;
      return data;
    });
};

export const getEnrolledCourses = async () => {
  let token = localStorage.getItem("token");
  return await axios
    .get(EMP_API_URL + "getEnrolledCourses", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      data = response.data;
      return data;
    });
};

const numberEmployeesToShow = 3;
let employees = [];

export const getEmployeeWithEmail = async (currentPage) => {
  await getAllEmployees();

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
  let token = localStorage.getItem("token");
  return await axios
    .get(
      OWN_API_URL + "getAllEmployees",
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
  console.log( id );
  return await axios.delete(Base_URL + `Owner/Employee?id=${ id }`);
};

export const getEmployee = async () => {
  let token = localStorage.getItem("token");
  return await axios
    .get(Base_URL + "Employee/Employees", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    });
};

export const updateEmployee = async (
  id,
  firstName,
  lastName,
  file,
  description
) => {
  let fd = new FormData();
  fd.append("FirstName", firstName);
  fd.append("LastName", lastName);
  fd.append("ProfileSummary", description);
  fd.append("File", file);
  let token = localStorage.getItem("token");
  try {
    const resp = await axios.put(Base_URL + `Employee/Employees?id=${id}`, fd, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp;
  } catch (err) {}
};

export const enrollToCourse = async (courseId) => {
  let token = localStorage.getItem("token");
  console.log(token)
  try {
    const resp = await axios.post(
      EMP_API_URL + `addEmployeeToCourse?courseId=${courseId}`,courseId,{
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  } catch (err) {}
};
