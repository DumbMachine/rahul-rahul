import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../utils/common";

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "secret";

function Login(props) {
  let redirectReason = null;
  const [loading, setLoading] = useState(false);
  const username = useFormInput(DEFAULT_USERNAME);
  const password = useFormInput(DEFAULT_PASSWORD);
  const [error, setError] = useState(null);

  if (
    props.location.state != null &&
    "redirectReason" in props.location.state
  ) {
    redirectReason = props.location.state.redirectReason;
  }

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post(
        "http://localhost:8000/v1/tokenReact",
        {
            username: username.value,
            password: password.value,
        },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log(response);
        setUserSession(response.data.access_token);
        props.history.push("/search");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setError(`Something went wrong. Please try again later. ${error}`);
      });
  };

  return (
    <div>
      {redirectReason ? (
        <p className="redirectReason">{redirectReason}</p>
      ) : null}
      Login
      <br /> <br />
      <div>
        Username
        <br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password
        <br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <br />
      <input
        type="button"
        value={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
      <br />
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
