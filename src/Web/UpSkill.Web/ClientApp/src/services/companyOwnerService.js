import { Base_URL } from '../utils/baseUrlConstant';
import axios from "axios"; 

const invoiceStatus = "Pending";
const dueDate = "30.09.2021";

const coursesCompanyOwnerMock = [
    { id:'8', name: 'August', courses: [
            { name: 'Illustrator Advanced', date: '10.08.2021', price: 90 },
            { name: 'Life Balance Coach', date: '02.08.2021', price: 70 },
            { name: 'Photoshop Advanced',date: '22.08.2021', price: 40 },
            { name: 'C# Advanced', date: '14.08.2021', price: 80 },
            { name: 'Java Basic',date: '03.08.2021', price: 120 }
    ], totalForMonth: 400 },
    { id:'9', name: 'September', courses: [
        { name: 'Photoshop Advanced', date: '10.09.2022', price: 100 },
        { name: 'Illustrator Advanced', date: '15.09.2021', price: 50 },
        { name: 'Life Balance Coach', date: '22.09.2021', price: 80 },
    ], totalForMonth: 230 },
    { id:'10', name: 'October', courses: [
        { name: 'TypeScript', date: '02.10.2021', price: 170 },
        { name: 'Java Advanced', date: '02.10.2021', price: 60 },
        { name: 'JS Advanced', date: '02.10.2021', price: 140 }
    ], totalForMonth: 370 }
];
    

export const getInvoiceStatus = async ( uId ) => {
              
    return invoiceStatus;
}

export const getDueDate = async ( uId ) => {
              
    return dueDate;
}

export const getSubscriptionsForCompanyOwner = async ( uId, currentMonth ) => {
    let month = coursesCompanyOwnerMock.filter(m=> m.id === currentMonth)[0];
    
   return [month.name, month.courses, month.totalForMonth];
}

export const addEmployee = async ( fullName, email,position) => {    
  let token = localStorage.getItem("token");
  const employee= {
        fullName,
        email,
        position
    }
    axios.post( Base_URL + "Owner/Employee",employee,{headers: {"Authorization" : `Bearer ${token}`}})
    .then(res=> res.data.id)
    .catch(function (error) {
    console.log(error);
    });
}
