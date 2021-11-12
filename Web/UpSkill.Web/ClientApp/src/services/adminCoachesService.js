import axios from "axios";
import {Base_URL} from '../utils/baseUrlConstant';

const token = localStorage.getItem("token");

export const removeCoach = async (id) => {
  try {
    const resp = await axios.delete(Base_URL + `Admin/Coaches?id=${id}`, {headers: {"Authorization" : `Bearer ${token}`}});
    return resp;
  } catch (err) {}
};
