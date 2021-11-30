const userStorageVarName = "user";

const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem(userStorageVarName));
    return user?.refreshToken;
  };
  
const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem(userStorageVarName));
    return user?.token;
  };
  
const updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem(userStorageVarName));
    user.token = token;
    localStorage.setItem(userStorageVarName, JSON.stringify(user));
  };
  
const getUser = () => {
    return JSON.parse(localStorage.getItem(userStorageVarName));
  };
  
const setUser = (user) => {
    console.log(JSON.stringify(user));
    localStorage.setItem(userStorageVarName, JSON.stringify(user));
  };
  
const removeUser = () => {
    localStorage.removeItem(userStorageVarName);
  };
  
const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
  };
  
  export default TokenService;