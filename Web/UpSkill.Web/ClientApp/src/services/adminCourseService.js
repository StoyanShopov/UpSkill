import { getCoachesNames } from "./coachService";
import { getCategoriesForCourses } from "./categoryService";

const numberCoursesToShow = 6;

const axios = require("axios");

const API_URL = "https://localhost:44319/Admin/Courses";

const initialCourses = [
  {
    id: "21312asdsa123",
    title: "Marketing",
    coachName: "Jim Wilber",
    description: "First steps into Marketing",
    price: 50.0,
    categoryId: 1,
    coachId: 2,
    categoryName: "Marketing",
    imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png",
  },
  {
    id: "321313adasd",
    title: "Design",
    coachName: "Tom Smith",
    description: "You wil learn basic Design principles...",
    price: 60,
    categoryId: 1,
    coachId: 1,
    categoryName: "Marketing",
    imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png",
  },
  {
    id: "3242432324",
    title: "Management",
    coachName: "Sarah Coleman",
    description: "You will aquire basic management knowledge...",
    price: 80,
    categoryId: 1,
    coachId: 2,
    categoryName: "Marketing",
    imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png",
  },
  {
    id: "32424324",
    title: "Management",
    coachName: "Sarah Coleman",
    description: "You will aquire basic management knowledge...",
    price: 80,
    categoryId: 1,
    coachId: 2,
    imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png",
    categoryName: "Marketing",
  },
  {
    id: "324324",
    title: "Management",
    coachId: 2,
    coachName: "Sarah Coleman",
    description: "You will aquire basic management knowledge...",
    price: 80,
    categoryId: 1,
    categoryName: "Marketing",
    imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png",
  },
];

export const getCourses = async (currentPage) => {
  let arr = [];
  arr.push(
    ...initialCourses.slice(
      0,
      currentPage * numberCoursesToShow + numberCoursesToShow
    )
  );

  return initialCourses;
};

//Get the real data from Db

// export const getCoursesDb = async () => {
//   let returnCourses = [];
//   try {
//     let returnCoaches = [];
//     let returnCourse = {};

//     let returnCategories = [];

//     getCategoriesForCourses().then((categories) => {
//       categories.forEach((ca) => returnCategories.push(ca));
//     });

//     getCoachesNames().then((coaches) =>
//       coaches.forEach((c) => returnCoaches.push(c))
//     );

//     console.log(returnCategories);
//     console.log(returnCoaches);

//     const resp = await axios.get(API_URL+"/getAll");
//     let respData = resp.data;
//     console.log(respData);

//     respData.map((c) => {
//       returnCourse = c;
//       console.log(returnCourse);
//       let currentCoach = returnCoaches.find(
//         (c) => c.value == returnCourse.coachId
//       );

//       if (currentCoach) {
//         returnCourse["coachName"] = currentCoach.label;
//       }

//       let currentCategory = returnCategories.find(
//         (ca) => ca.value == returnCourse.categoryId
//       );

//       if (currentCategory) {
//         returnCourse["categoryName"] = currentCategory.label;
//       }
//       returnCourses.push(returnCourse);
//     });

//     return returnCourses;
//   } catch (error) {}
// };

// export const getCourses = async () => {
//   try {
//     const resp = await axios.get("http://localhost:5001/courses");
//     console.log(resp.data);
//     return resp.data;
//   } catch (err) {
//     // Handle Error Here
//     console.error(err);
//   }
// };

export const addCourses = async (course) => {
  try {
    const resp = await axios.post(API_URL, course);
    return resp;
  } catch (err) {}
};

export const updateCourses = async (course) => {
  try {
    const resp = await axios.put(API_URL + "?id=" + course.id, course);
  } catch (err) {}
};

export const deleteCourses = async (id) => {
  try {
    const resp = await axios.delete(API_URL + "?id=" + id);
  } catch (err) {}
};
