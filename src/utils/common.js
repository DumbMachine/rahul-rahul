// return the user data from the session storage
export const getUser = () => {
  const tokenStr = sessionStorage.getItem("token");
  if (tokenStr) return tokenStr;
  else return null;
};

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("refreshToken");
};

// set the token and user from the session storage
export const setUserSession = (token, refreshToken = null) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("refreshToken", refreshToken);
};
