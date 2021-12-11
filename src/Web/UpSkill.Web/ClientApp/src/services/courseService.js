import { Base_URL } from "../utils/baseUrlConstant";

const numberCoursesToShow = 6;
const API_URL = "https://localhost:44319/Admin/Courses";
const axios = require("axios");

const initialCourses = [
  {
    id: 1,
    courseName: "Marketing",
    coachName: "Jim Wilber",
    imageName: "Marketing.png",
    price: 50,
  },
  {
    id: 2,
    courseName: "Design",
    coachName: "Tom Smith",
    imageName: "Design.png",
    price: 40,
  },
  {
    id: 3,
    courseName: "Management",
    coachName: "Sarah Coleman",
    imageName: "Management.png",
    price: 60,
  },
  {
    id: 4,
    courseName: "HTML&CSS",
    coachName: "David Can",
    imageName: "HTML&CSS.png",
    price: 100,
  },
  {
    id: 5,
    courseName: "Java",
    coachName: "Emily Hill",
    imageName: "Java.png",
    price: 70,
  },
];

export const getCourses = async (currentPage) => { 
  let arr = [];
  try {
    const resp = await axios.get(Base_URL + "Courses/getAll");
    console.log(resp.data);
    arr.push(...resp.data.slice(0, currentPage * numberCoursesToShow));
  } catch (err) {}
  return arr;
};

export const getCourseDetails = async (id) => {
  try {
    const resp = await axios.get(API_URL + "/details?id=" + id);
    console.log(resp);
  } catch (err) {}
};
