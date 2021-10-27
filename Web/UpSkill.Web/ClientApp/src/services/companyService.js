
import axios from 'axios';

//RetriveCompany
export const retriveCompanies = async () => {
  const response = await axios
  .get("https://localhost:44319/Admin/Companies/getAll");
  return response.data;
}
//Create
export const addCompanyHandler = async (company) => {

  const request = {
    name: company.name,
  };

  return await axios
  .post("https://localhost:44319/Admin/Companies/create", request)
  .then(response => response.data);
};
//Update
export const updateCompanyHandler = async (company) => {
  return await axios
  .put(`https://localhost:44319/Admin/Companies/edit?id=${company.id}`, company)
  .then(response => response.data);
};
//Delete
export const removeCompanyHandler = async (id) => {
  return await axios.delete(`https://localhost:44319/Admin/Companies/delete?id=${id}`);
}
const initialCompanies = [
  {
    id: 1,
    companyName: "Motion Software",
  },
  {
    id: 2,
    companyName: "Scale Focus",
  },
  {
    id: 3,
    companyName: "SoftUni",
  },
  {
    id: 4,
    companyName: "Test",
  },
  {
    id: 5,
    companyName: "Metro",
  },
  {
    id: 6,
    companyName: "Fantastiko",
  },
];

export const getCompanies = async () => {
  //      let res = await request(``, 'Get');

  return initialCompanies;

};
