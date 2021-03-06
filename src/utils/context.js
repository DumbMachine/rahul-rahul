import { useState, useEffect, createContext } from "react";

const GlobalUserContext = createContext();
const GlobalUserContextProvider = (props) => {
  const [userToken, setUserToken] = useState("AdminToken");
  const [refreshToken, setRefreshToken] = useState("AdminDoesNotNeedARefresh");

  const readUserToken = () => {
    const CONST_U_TOKEN = "";
    setUserToken(CONST_U_TOKEN);
  };

  const removeUserToken = () => {
    setUserToken("");
  };

  const readRefreshToken = () => {
    const CONST_R_TOKEN = "";
    setRefreshToken(CONST_R_TOKEN);
  };

  const removeRefreshToken = () => {
    setRefreshToken("");
  };

  return (
    <GlobalUserContext.Provider
      value={{
        userToken,
        refreshToken,
        setUserToken,
        removeUserToken,
        setRefreshToken,
        removeRefreshToken,
      }}
    >
      {props.children}
    </GlobalUserContext.Provider>
  );
};

export { GlobalUserContextProvider, GlobalUserContext };
// export default GlobalUserContextProvider ;
