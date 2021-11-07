import axios from "axios";

export const testGet = async () => {
  try {
    const resp = await axios.get("https://localhost:44319/Admin/Dashboard");
    return resp.data;
  } catch (err) {}
};