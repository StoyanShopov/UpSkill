import axios from "axios";
import { Base_URL } from "../utils/baseUrlConstant";

const token = localStorage.getItem("token");

export const adminDashboardGet = async () => {
  try {
    const resp = await axios.get(Base_URL + "Admin/Dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp.data;
  } catch (err) {}
};
