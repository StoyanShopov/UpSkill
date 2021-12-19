import axios from "axios";
import { Base_URL } from "../utils/baseUrlConstant";

const ADMIN_API_URL = Base_URL + "Admin/Companies/";



export const adminDashboardGet = async () => {
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.get(Base_URL + "Admin/Dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp.data;
  } catch (err) {}
};

const numberClientsToShow = 3;
let clients = [];
let clientsWithEmails = [];

export const getSliced = async (currentPage) => {
  await getCompaniesEmails();

  let arr = [];
  arr.push(
    ...clientsWithEmails.slice(
      0,
      currentPage * numberClientsToShow + numberClientsToShow
    )
  );

  return arr;
};

export const getCompaniesEmails = async () => {
  return await axios
    .get(ADMIN_API_URL + "getCompanyEmail", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      clientsWithEmails = [];
      response.data.map((x) => clientsWithEmails.push(x));
      return clientsWithEmails;
    });
};

export const getAllClients = async (client) => {
  return await axios
    .get(
      ADMIN_API_URL + "getAll",
      { headers: { Authorization: `Bearer ${token}` } },
      { client }
    )
    .then((response) => {
      clients = [];
      response.data.map((x) => clients.push(x));
      return clients;
    });
};

export const getClientsTotalCountSuperAdmin = async () => {
  await getAllClients();
  return clients.length;
};

export const removeClientHandler = async (id) => {
  console.log(id);
  return await axios.delete(Base_URL + `Admin/Companies?id=${id}`);
};

export const addClient = async (name) => {
  const client = {
    name,
  };

  const response = [];

  await axios
    .post(Base_URL + "Admin/Companies", client, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => response.push(res.data))
    .catch(function (error) {
      console.log(error);
    });

  return response;
};

export const profitAdminMock = [
  { id: '1', title: "Design", revenue: 10000, expenses: 2000, profit: 8000 },
  { id: '2',  title: "Marketing", revenue: 5000, expenses: 2000, profit: 3000 },
  { id: '3', title: "Management", revenue: 12000, expenses: 10000, profit: 2000 },
];
