const numberCoursesToShow = 6;


const axios = require("axios");

const API_URL = "https://localhost:44319/Admin/Courses";

const initialCourses = [
  {
    id: "21312asdsa123",
    title: "Marketing",
    coachFirstName: "Jim",
    coachLastName: "Wilber",
    description: "First steps into Marketing",
    price: 50.0,
    categoryId: 1,
    imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png",
  },
  {
    id: "321313adasd",
    title: "Design",
    coachFirstName: "Tom",
    coachLastName: "Smith",
    description: "You wil learn basic Design principles...",
    price: 60,
    categoryId: 1,
    imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png",
  },
  {
    id: "3242432324",
    title: "Management",
    coachFirstName: "Sarah",
    coachLastName: "Coleman",
    description: "You will aquire basic management knowledge...",
    price: 80,
    categoryId: 1,
    imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png",
  },
  {
    id: "32424324",
    title: "Management",
    coachFirstName: "Sarah",
    coachLastName: "Coleman",
    description: "You will aquire basic management knowledge...",
    price: 80,
    categoryId: 1,
    imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png",
  },
  {
    id: "324324",
    title: "Management",
    coachFirstName: "Sara",
    coachLastName: "Coleman",
    description: "You will aquire basic management knowledge...",
    price: 80,
    categoryId: 1,
    imageUrl: "https://i.ibb.co/9Twgqz8/Rectangle-1221.png",
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

  return initialCourses;
};

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
    // const resp = await axios.post(API_URL + "create", course);
    const resp = await axios.post(API_URL, course);
    console.log(resp.data);
    return resp;
  } catch (err) {
    console.error(err);
  }
};

export const updateCourses = async (course) => {
  try {
    // const resp = await axios.post(API_URL + "create", course);
    const resp = await axios.put(API_URL +"?id=" + course.id, course);
    console.log(resp.data);
  } catch (err) {
    console.error(err);
  }

  //     initialCourses.push({
  //         course.id,
  //         title,
  //         coachFirstName,
  //         coachLastName,
  //         description,
  //         price,
  //         categoryId,
  //         imageUrl:'https://i.ibb.co/9Twgqz8/Rectangle-1221.png'

  //     });

  //    initialCourses.forEach(c => console.log(c.title));
};

export const deleteCourses= async(id) => {
    try {
        // const resp = await axios.post(API_URL + "create", course);
        const resp = await axios.delete(API_URL +"?id=" + id);
        console.log(resp.data);
      } catch (err) {
        console.error(err);
      }    
    
}
