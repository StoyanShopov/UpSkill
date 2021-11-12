import axios from "axios"
import { Base_URL } from '../utils/baseUrlConstant';
const API_URL = Base_URL + "Owner/Courses";

const getActiveCourses = async () => {
    await axios.get(API_URL + '/getactivecourses');
};

const enableCourse = async (courseId) => {
    await axios.put(API_URL + "?id=" + courseId);
};
const disableCourse = async (courseId) => {
    await axios.put(API_URL + "?id=" + courseId);
};

const serviceActions = {
    getActiveCourses,
    enableCourse,
    disableCourse
};

export default serviceActions;