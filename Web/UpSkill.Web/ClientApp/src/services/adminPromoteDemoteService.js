import axios from "axios";

const getUserAsync = async (email) => {
    return await axios.get(`https://localhost:44319/Admin/Admin?email=${email}`)
}

const promoteAsync = async (email) => {
     await axios.put(`https://localhost:44319/Admin/Admin/promote?email=${email}`)
}

const demoteAsync = async (email) => {
      await axios.put(`https://localhost:44319/Admin/Admin/demote?email=${email}`) 
}

const serviceActions = {
    getUserAsync,
    promoteAsync,
    demoteAsync,
};

export default serviceActions;