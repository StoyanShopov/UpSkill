import axios from 'axios';
import { Base_URL } from '../utils/baseUrlConstant';

//GetCompanies
export const getCompanies = async () => {
  const token = localStorage.getItem("token");

  const response = await axios
  .get( Base_URL + "Admin/Companies/getAll", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

//Create
export const addCompanyHandler = async (company) => {

  const request = {
    name: company.name,
  };

  return await axios
  .post( Base_URL + "Admin/Companies/create", request)
  .then(response => response.data);
};
//Update
export const updateCompanyHandler = async (company) => {
  return await axios
  .put( Base_URL + `Admin/Companies/edit?id=${company.id}`, company)
  .then(response => response.data);
};
//Delete
export const removeCompanyHandler = async (id) => {
  return await axios.delete( Base_URL + `Admin/Companies/delete?id=${id}`);
};

const initialCompanies = [
  {
    id: 1,
    companyName: 'Motion Software',
  },
  {
    id: 2,
    companyName: 'Scale Focus',
  },
  {
    id: 3,
    companyName: 'SoftUni',
  },
  {
    id: 4,
    companyName: 'Test',
  },
  {
    id: 5,
    companyName: 'Metro',
  },
  {
    id: 6,
    companyName: 'Fantastiko',
  },
];
