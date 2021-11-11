import axios from "axios"; 
import { Base_URL } from '../utils/baseUrlConstant';

const API_URL = Base_URL + "Employee/Courses/";

const token = localStorage.getItem("token");

let data = []; 

export const getCourses = (courseId, courseTitle, courseCoachFirstName, courseCoachLastName, courseFileFilePath) => {
  return axios.get(API_URL + "getAll", {headers: {"Authorization" : `Bearer ${token}`}}, {
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

const numberEmployeesToShow = 3;





let employees= [];

export const getEmployeeWithEmail = async (currentPage) => {
  getAllEmployees()
  
  
        let arr = [];
        arr.push(...employees
            .slice(0, currentPage * numberEmployeesToShow + numberEmployeesToShow));    
        
       return arr;
}

export const getEmployeesTotalCountCompanyOwner = async (uId) => {    
   return employees.length;
}

export const getAllEmployees = async (employee) => {
  return axios.get(Base_URL+"Owner/Employee/getAll", {headers: {"Authorization" : `Bearer ${token}`}},{employee})
  .then((response) => {  
    employees=[];  
    response.data.map(x=>employees.push(x)); 
    return employees;
  }); 
}

export const removeEmployeeHandler = async (id) => {
  console.log(id);
  return await axios.delete(Base_URL + `Owner/Employee?id=${id}`);
  
};
