import axios from "axios";
import {Base_URL} from '../utils/baseUrlConstant';


export const adminDashboardGet = async () => {
const token = localStorage.getItem("token");

  try {
    const resp = await axios.get(Base_URL + 'Admin/Dashboard', {headers: {"Authorization" : `Bearer ${token}`}});
    return resp.data
  } catch (err) {}
};
