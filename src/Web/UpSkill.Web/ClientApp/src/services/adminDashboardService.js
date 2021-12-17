import axios from "axios";
import { Base_URL } from "../utils/baseUrlConstant";

const ADMIN_API_URL = Base_URL + 'Admin/Companies/';

const token = localStorage.getItem("token");

export const adminDashboardGet = async () => {
  try {
    const resp = await axios.get(Base_URL + "Admin/Dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp.data;
  } catch (err) {}
};

const numberClientsToShow = 3;
let clients = [];

export const getClientWithEmail = async (currentPage) => {
  await getAllClients();

  let arr = [];
  arr.push(
    ...clients.slice(
      0,
      currentPage * numberClientsToShow + numberClientsToShow
    )
  );

  return arr;
};

export const getCompaniesEmails = async (companyEmail) => {
  return await axios
  .get(
    ADMIN_API_URL + 'getCompanyEmail',
    { headers: { Authorization: `Bearer ${token}`}},
    {companyEmail}   
  )
  .then((response) => {
    const companiesEmails = [];
    response.data.map((x) => companiesEmails.push(x));
    return companiesEmails;
  })
}

export const getAllClients = async (client) => {
  return await axios
    .get(
      ADMIN_API_URL + 'getAll',
      { headers: { Authorization: `Bearer ${token}` } },
      { client }
    )
    .then((response) => {
      clients = [];
      response.data.map((x) => clients.push(x));
      return clients;
    });
};

export const getClientsTotalCountSuperAdmin = async (uId) => {
  await getAllClients();
  return clients.length;
};

export const removeClientHandler = async (id) => {
  console.log(id);
  return await axios.delete(Base_URL + `Admin/Companies?id=${id}`);
};

export const addClient = async ( name) => {
    
  const client= {
      name,
  }

  const response = [];

 await axios.post( Base_URL + "Admin/Companies",client,{headers: {"Authorization" : `Bearer ${token}`}})
 .then(res=> response.push(res.data))
 .catch(function (error) {
   console.log(error);
 });

 return response;
}
