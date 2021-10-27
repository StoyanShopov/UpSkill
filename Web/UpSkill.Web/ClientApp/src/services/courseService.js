const numberCoursesToShow = 5;
const API_URL = "https://localhost:44319/Admin/Courses";
const axios = require("axios");

const initialCourses = [
  {
    id: 1,
    courseName: 'Marketing',
    coachName: 'Jim Wilber',
    imageName: 'Marketing.png',
  },
  {
    id: 2,
    courseName: 'Design',
    coachName: 'Tom Smith',
    imageName: 'Design.png',
  },
  {
    id: 3,
    courseName: 'Management',
    coachName: 'Sarah Coleman',
    imageName: 'Management.png',
  },
  {
    id: 4,
    courseName: 'HTML&CSS',
    coachName: 'David Can',
    imageName: 'HTML&CSS.png',
  },
  {
    id: 5,
    courseName: 'Java',
    coachName: 'Emily Hill',
    imageName: 'Java.png',
  },
];

export const getCourses = async (currentPage) => {
  //      let res = await request(``, 'Get');
  let arr = [];
  arr.push(
    ...initialCourses.slice(
      0,
      currentPage * numberCoursesToShow + numberCoursesToShow
    )
  );

  return arr;
};


export const getCourseDetails = async (id) => {
  try {
    const resp = await axios.get(API_URL + "/details?id=" + id);
    console.log(resp)
  } catch (err) {}
};