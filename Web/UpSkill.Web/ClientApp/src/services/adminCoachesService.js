import axios from "axios";
import { Base_URL } from "../utils/baseUrlConstant";

const token = localStorage.getItem("token");

export const removeCoach = async (id) => {
  try {
    const resp = await axios.delete(Base_URL + `Admin/Coaches?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp;
  } catch (err) {}
};

export const createCoach = async (firstName, lastName, file) => {
  let fd = new FormData(); 
  fd.append("FirstName", firstName);
  fd.append("LastName", lastName);
  fd.append("File",  file,)
  console.log(fd);
  try {
    const resp = await axios.post(
      Base_URL + "Admin/Coaches",
      fd,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  } catch (err) {}
};

export const updateCoach = async (id,firstName, lastName, file) => {
  let fd = new FormData(); 
  fd.append("FirstName", firstName);
  fd.append("LastName", lastName);
  fd.append("File",  file,)
  console.log(fd);
  try {
    const resp = await axios.put(
      Base_URL + `Admin/Coaches?id=${id}`,
      fd,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  } catch (err) {}
};
