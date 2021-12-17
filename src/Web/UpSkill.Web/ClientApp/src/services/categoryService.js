import axios from "axios";
import { Base_URL } from "../utils/baseUrlConstant";

const token = localStorage.getItem("token");

const categoriesMock = [
  "Art",
  "Design",
  "Marketing",
  "Leadership",
  "Data Science",
  "Personal Development",
  "Computer Science",
];

const categoriesMockForCourse = [
  { label: "Art", value: "1" },
  { label: "Design", value: "2" },
  { label: "Marketing", value: "3" },
  { label: "Leadership", value: "4" },
  { label: "Data Science", value: "5" },
  { label: "Personal Development", value: "6" },
  { label: "Computer Science", value: "7" },
];

export const getCategories = async () => {
  //      let res = await request(``, 'Get');

  return categoriesMock;
};

export const getCategoriesForCourses = async () => {
  try {
    const resp = await axios.get(Base_URL + "Admin/Categories/getAll", {
      headers: { Authorization: `Bearer ${token}` },
    });

    let transformedResp = resp.data.map((c) => {
      return {
        label: c.name,
        value: c.id,
      };
    });

    return transformedResp;
  } catch (error) {}
};
