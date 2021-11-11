import axios from "axios"

const getActiveCourses = async (email) => {
    return await axios.get(`https://localhost:44319/Owner/Courses/getactivecourses?email=${email}`);
}

const serviceActions = {
    getActiveCourses
};

export default serviceActions;