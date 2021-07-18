import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "./common";

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/search" }} />
        )
      }
    />
  );
}

export default PublicRoute;