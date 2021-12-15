import axios from "axios"; 
import { Base_URL } from '../utils/baseUrlConstant';

const API_URL = Base_URL + "Course";

const token = localStorage.getItem("token");

const numberCoursesToShow = 6;

const initialCourses = [
  {
    id: 1,
    courseName: 'Marketing',
    coachName: 'Jim Wilber',
    imageName: 'Marketing.png',
    price: 50,
  },
  {
    id: 2,
    courseName: 'Design',
    coachName: 'Tom Smith',
    imageName: 'Design.png',
    price: 40,
  },
  {
    id: 3,
    courseName: 'Management',
    coachName: 'Sarah Coleman',
    imageName: 'Management.png',
    price: 60,
  },
  {
    id: 4,
    courseName: 'HTML&CSS',
    coachName: 'David Can',
    imageName: 'HTML&CSS.png',
    price: 100,
  },
  {
    id: 5,
    courseName: 'Java',
    coachName: 'Emily Hill',
    imageName: 'Java.png',
    price: 70,
  },
];

const DetailsContent =
{
    id: 14,
    courseTitle: 'Marketing',
    courseDescription: 'Financial Analysis and Valuation for Lawyers is a course designed to help you navigate your organization or client�s financial goals while increasing profitability and minimizing risks.',
    courseLecturer: 'Ben Levis',
    courseVideo: 'https://youtu.be/Y2a16HAsHBE',
    lectures: [
      {
        courseSubject: 'Introduction', 
        courseVideo: 'https://youtu.be/Y2a16HAsHBE',
        resource: 'file.pdf',
      },
      {
        courseSubject: 'Marketing',
        courseVideo: 'https://youtu.be/Y2a16HAsHBE',
        resource: 'file.pdf',
      },
      {
        courseSubject: 'Digital Marketing',
        courseVideo: 'https://youtu.be/Y2a16HAsHBE',
        resource: 'file.pdf',
      }
    ],
};

export const getCourses = async (currentPage) => {
  let arr = [];
  try {
    const resp = await axios.get(Base_URL + "Courses/getAll");
    console.log(resp.data);
    arr.push(...resp.data.slice(0, currentPage * numberCoursesToShow));
  } catch (err) {}
  return arr;
};

let data = [];

export const courseDetailsContent = (courseId) => {
  return axios.get(API_URL +`?id=${courseId}`
  )
  .then((response) => {
    data = [];
    data.push(response.data);
    return data;
  });
};

// export const getCourseDetails = async (id) => {
//   try {
//     const resp = await axios.get(API_URL + "/details?id=" + id);
//     console.log(resp)
//   } catch (err) {}
// };
