import React from "react";

import { Card } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

function SearchBarResult({
  index,
  filename,
  snippet,
  activeResult,
  setActiveResult,
  resultsLoading,
  handleRedirect,
}) {
  const resultClass =
    index === activeResult
      ? "spantree-search-result spantree-result-active"
      : "spantree-search-result";

  return (
    <div>
      <div
        className={resultClass}
        // onClick={() => {
        //   handleRedirect(index);
        // }}
        onMouseEnter={() => {
          setActiveResult(index);
        }}
      >
        <div>
          {/* <img
            className="spantree-file-icon"
            src={
              "https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png"
            }
            align="left"
          ></img> */}
        </div>
        <div className="spantree-search-file">
          <div className="spantree-search-filename">{filename}</div>
        </div>
        <br />
        <div className="spantree-search-snippet">
          {snippet.pre}
          <span style={{ color: "red" }}> {snippet.matched} </span> ,
          {snippet.post}
        </div>
      </div>
    </div>
  );
}

export default SearchBarResult;
