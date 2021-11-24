import {logout} from "../services/auth.service"

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
  if (user && user.accessToken) {
    return { Authorization: 'Bearer' + user.accessToken };
  } else if (user.headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
    logout();
    console.log("Session expired - please login again.");
  } else {
     return {};
  }
}
