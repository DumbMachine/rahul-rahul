import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateContext";
import { actionTypes } from "../reducer";

import AppsIcon from "@material-ui/icons/Apps";
import { Avatar } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import MicIcon from "@material-ui/icons/Mic";
import { Button } from "@material-ui/core";

import "./search.css";

function Search({ hideButtons = false }) {
  // const [x, dispatch] = useStateValue();

  const [input, setInput] = useState("");
  const history = useHistory();

  const search = (e) => {
    e.preventDefault();

    console.log("You hit the search button >>", input);

    // dispatch({
    //   type: actionTypes.SET_SEARCH_TERM,
    //   term: input,
    // });

    history.push("/goolgeui");
  };

  return (
    <div className="home">
      <div className="home__header">
        <div className="home__headerLeft">
          <Link to="/about">About</Link>
          <Link to="/store">Store</Link>
        </div>
        <div className="home__headerRight">
          <Link to="/gmail">Gmail</Link>
          <Link to="/images">Images</Link>
          <AppsIcon />
          <Avatar />
        </div>
      </div>

      <div className="home__body">
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          alt="Logo"
        />

        <div className="home__inputContainer">
          <form className="search">
            <div className="search__input">
              <SearchIcon className="search__inputIcon" />
              <input value={input} onChange={(e) => setInput(e.target.value)} />
              <MicIcon />
            </div>

            {!hideButtons ? (
              <div className="search__buttons">
                <Button type="submit" onClick={search} variant="outlined">
                  Google Search
                </Button>
                <Button variant="outlined">I'm Feeling Lucky</Button>
              </div>
            ) : (
              <div className="search__buttons">
                <Button
                  className="search__buttonHidden"
                  type="submit"
                  onClick={search}
                  variant="outlined"
                >
                  Google Search
                </Button>
                <Button className="search__buttonHidden" variant="outlined">
                  I'm Feeling Lucky
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search;
