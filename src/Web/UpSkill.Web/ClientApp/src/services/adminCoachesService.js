import axios from "axios";
import { Base_URL } from "../utils/baseUrlConstant";
import Feedback from "react-bootstrap/esm/Feedback";

const token = localStorage.getItem("token");

export const removeCoach = async (id) => {
  try {
    const resp = await axios.delete(Base_URL + `Admin/Coaches?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp;
  } catch (err) {}
};

export const createCoach = async (firstName, lastName, field, price,file, calendlyUrl) => {
  let fd = new FormData(); 
  fd.append("FirstName", firstName);
  fd.append("LastName", lastName);
  fd.append("Field", field);
  fd.append("Price", price);
  fd.append("File",  file,)
  fd.append("CalendlyUrl", calendlyUrl)
  
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

export const updateCoach = async (id,firstName, lastName, field, price, file, calendlyUrl) => {
  let fd = new FormData(); 
  fd.append("FirstName", firstName);
  fd.append("LastName", lastName);
  fd.append("Field", field);
  fd.append("Price", price);
  fd.append("File",  file,)
  fd.append("CalendlyUrl", calendlyUrl)
  
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
