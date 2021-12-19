import axios from "axios";
import { Base_URL } from "../utils/baseUrlConstant";

const OWN_API_URL = Base_URL + "Employee/Coaches";

export const getCoaches = async (currentPage) => {
  let token = localStorage.getItem("token");
  try {
    let arr = [];
    const resp = await axios.get(OWN_API_URL + "/getAll", {
      headers: { Authorization: `Bearer ${token}` },
    });
    arr.push(...resp.data);
    //arr= arr.slice(0, currentPage * numberCoachesToShow + numberCoachesToShow);
    return arr;
  } catch (err) {}
};

export const setCoachNotNew = async (coachId) => {
  let token = localStorage.getItem("token");
  try {
    const resp = await axios.put(
      OWN_API_URL + "/setNotNewCoach?coachId=" + coachId,
      coachId,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {}
};
