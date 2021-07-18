// import "./App.css";
import SearchBarMain from "./components/searchBar/SearchBarMain";

import { useState, useEffect } from "react";
import PrivateRoute from "./utils/privateRoute";
import PublicRoute from "./utils/publicRoute";
import Login from "./components/login";
import UploadButton from "./components/uploadButton";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

import { getToken, removeUserSession, setUserSession } from "./utils/common";
import { GlobalUserContextProvider } from "./utils/context";

import "./App.css";

function HomePage() {
  return <h1>HomePage ( you are logged in )</h1>;
}
const SignUp = Login;

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    // const token = getToken();
    setToken(getToken());
    // if (!token) {
    //   return;
    // } else

    // PATCH: Do not verify tokens
    //   axios
    //     .get(`http://localhost:8000/verifyToken?token=${token}`)
    //     .then((response) => {
    //       setUserSession(response.data.token, response.data.user);
    //       setAuthLoading(false);
    //     })
    //     .catch((error) => {
    //       removeUserSession();
    //       setAuthLoading(false);
    //     });
    // }, []);

    // if (authLoading && getToken()) {
    //   return <div className="content">Checking Authentication...</div>;
  });
  return (
    <div className="App">
      <GlobalUserContextProvider>
        <BrowserRouter>
          {/* <div className="header"> */}
            <Switch>
              <PrivateRoute exact path="/" component={HomePage} />
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/join" component={SignUp} />
              <PublicRoute path="/search" component={SearchBarMain} />
              <PublicRoute path="/upload" component={UploadButton} />
            </Switch>
          {/* </div> */}
        </BrowserRouter>
      </GlobalUserContextProvider>
    </div>
  );
}

export default App;
