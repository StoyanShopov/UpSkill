import { Base_URL } from "../utils/baseUrlConstant";

const numberCoursesToShow = 6;

const axios = require("axios");

const API_URL = Base_URL + "Admin/Courses";

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
    categoryName: "Design",
  },
  {
    id: "324324",
    title: "Management",
    coachId: 2,
    coachName: "Sarah Coleman",
    description: "You will aquire basic management knowledge...",
    price: 80,
    categoryId: 1,
    categoryName: "Art",
    imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png",
  },
];

export const getCourses = async (currentPage) => {
  let arr = [];
  let token = localStorage.getItem("token");
  const resp = await axios.get(API_URL + "/getAll", {
    headers: { Authorization: `Bearer ${token}` },
  });
  let respData = resp.data;
  arr.push(
    ...respData.slice(
      0,
      currentPage * numberCoursesToShow + numberCoursesToShow
    )
  );

  return respData;
};

export const getCourseDetails = async (id) => {
  let token = localStorage.getItem("token");
  try {
    const resp = await axios.get(API_URL + "/details?id=" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    let respData = resp.data;
    return respData;
  } catch (error) {}
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

export const addCourses = async (course) => {
  let fd = new FormData();
  fd.append("Title", course.title);
  fd.append("Description", course.description);
  fd.append("Price", course.price);
  fd.append("CoachId", course.coachId);
  fd.append("CategoryId", course.categoryId);
  fd.append("File", course.file);
  let token = localStorage.getItem("token");

  try {
    const resp = await axios.post(API_URL, fd, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp;
  } catch (err) {}
};

export const updateCourses = async (course) => {
  let token = localStorage.getItem("token");
  let fd = new FormData();
  fd.append("Title", course.title);
  fd.append("Description", course.description);
  fd.append("Price", course.price);
  fd.append("CoachId", course.coachId);
  fd.append("CategoryId", course.categoryId);
  fd.append("File", course.file);

  try {
    const resp = await axios.put(API_URL + "?id=" + course.id, fd, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp;
  } catch (err) {}
};

export const deleteCourses = async (id) => {
  let token = localStorage.getItem("token");
  try {
    const resp = await axios.delete(API_URL + "?id=" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp;
  } catch (err) {}
};
