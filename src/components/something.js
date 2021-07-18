/*
TODO: Stop Fetching when another fetch is started

*/

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Backdrop from "./Backdrop";
import SearchBarResult from "./SearchBarResult";
import useEventListener from "../utils/useEventListener";

import CONST_results from "../mock/searchresults.json";

import { getUser, removeUserSession } from "../utils/common";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzMTQyNjM4N30.UsgWa27ISERZUnTqsmCWmmCAJoWLswHodMFzzc0DmYs";
const SUPPORTED_AUTH = {
  google: {
    link: `http://localhost:8000/google/authorize?access_token=${token}`,
    authCheck: "http://localhost:8000/google/checkauthorize",
  },
  figma: {
    link: "http://localhost:8000/figma/authorize",
    authCheck: "http://localhost:8000/figma/checkauthorize",
  },
  notion: {
    link: "http://localhost:8000/notion/authorize",
    authCheck: "http://localhost:8000/notion/checkauthorize",
  },
};

function AuthLinks() {
  const AUTH_STATUS = {};
  for (let link in SUPPORTED_AUTH) {
    AUTH_STATUS[link] = false;
  }

  const [authRedirects, setAuthRedirects] = useState(SUPPORTED_AUTH);
  const [loadingAuthStatus, setLAS] = useState(true);
  const [authStatuses, setAuthStatuses] = useState(AUTH_STATUS);

  const fetchMyAPI = useCallback(async () => {
    const local_status = {};
    for (let key in authRedirects) {
      await axios
        .get(authRedirects[key].authCheck, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        })
        .then((response) => {
          local_status[key] = response.data.auth_status;
          console.log("setting new status", local_status, authStatuses);
        })
        .catch((error) => {
          local_status[key] = false;
          console.log("error while getting authStatus", error);
        });
    }
    console.log(authStatuses, "Ahah", local_status);
    setAuthStatuses(local_status);
    setLAS(false);
  }, []);

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  return (
    <>
      {loadingAuthStatus ? (
        <p>Loading Auth Statutes</p>
      ) : (
        <>
          Auth Links:
          {Object.keys(AUTH_STATUS).map(function (key, index) {
            return (
              <p key={index}>
                <a href={authRedirects[key].link}>{key}</a> +{" "}
                {String(authStatuses[key])}
              </p>
            );
          })}
        </>
      )}
    </>
  );
}

function SearchBar({
  history,
  // showSearchbar,
  // setShowSearchbar,
  searchTerms,
  getSearchTerms,
  options,
}) {
  const [showSearchbar, setShowSearchbar] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchFor, setSearchFor] = useState("");
  const [activeResult, setActiveResult] = useState(0);
  const [resultsLoading, setResultsLoading] = useState(0);
  const [debounceTimerId, setDebounceTimerId] = useState(null);

  const user = getUser();
  const handleLogout = () => {
    removeUserSession();
    history.push("/login");
  };

  const defaultOptions = { "auto-theme": false, "compatibility-mode": true };

  const handleKeyDown = useCallback(
    (event) => {
      const isActionKey = isMac ? event.metaKey : event.ctrlKey;

      if (isActionKey && (event.key === "p" || event.key === "P")) {
        event.preventDefault();
        setShowSearchbar(true);
      } else if (isActionKey && event.key === "Enter" && showSearchbar) {
        handleRedirect(activeResult, true);
      } else if (event.key === "Enter") {
        console.log("aha");
        handleRedirect(activeResult, false);
      } else if (event.key === "ArrowUp" && showSearchbar) {
        event.preventDefault();
        setActiveResult(
          (activeResult) =>
            (searchResults.length + activeResult - 1) % searchResults.length
        );
      } else if (event.key === "ArrowDown" && showSearchbar) {
        event.preventDefault();
        setActiveResult(
          (activeResult) => (activeResult + 1) % searchResults.length
        );
      } else if (event.key === "Escape" && showSearchbar) {
        setShowSearchbar(false);
      }
    },
    [showSearchbar, activeResult, searchResults]
  );

  useEventListener("keydown", handleKeyDown);

  async function searchThis(query, target = "google") {
    let L_searchResults;
    // await axios
    //   .post(
    //     "http://localhost:8000/google/search",
    //     {
    //       query: query,
    //       // query: "hulk",
    //       query_type: "name",
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         accept: "application/json",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log("Search results", response);
    //     L_searchResults = response.data.files;
    //   })
    //   .catch((error) => {
    //     console.log("this is error", error);
    //   });
    L_searchResults = CONST_results;
    setSearchResults(L_searchResults);
  }

  const handleRedirect = (id, inNewTab) => {
    const currentResult = searchResults[id];

    if (inNewTab) {
      window.open(currentResult.url, "_blank");
      // for overwriting default behavior on Firefox
      window.focus();
    } else {
      window.location.href = currentResult.url;
    }
  };

  const isMac = false;

  return (
    <Fragment>
      <Backdrop
        showSearchbar={showSearchbar}
        setShowSearchbar={setShowSearchbar}
      />

      <div className="spantree-search"></div>
    </Fragment>
  );
}

export default SearchBar;

/*
<div className="spantree-searchbar">
          <input
            type="text"
            value={searchFor}
            placeholder="🔍 Search in my ass"
            onChange={(e) => {
              if (e.target.value == "") {
                // clear search results
                setSearchResults([]);
              } else {
                searchThis(e.target.value, "google");
              }
              setSearchFor(e.target.value);
            }}
            autoFocus
          />
        </div>
        <div
          className={
            resultsLoading <= 0
              ? "spantree-search-results"
              : "spantree-search-results  spantree-results-loading"
          }
        >
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((resultTerm, index) => {
                return (
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  // <div>
                  //   <SearchBarResult
                  //     key={index}
                  //     index={index}
                  //     filename={resultTerm.file.name}
                  //     snippet={resultTerm.snippet}
                  //     activeResult={activeResult}
                  //     setActiveResult={setActiveResult}
                  //     resultsLoading={resultsLoading}
                  //     handleRedirect={handleRedirect}
                  //   />
                  // </div>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="spantree-search-help">
           <span className="spantree-search-help-item">
            <code>
              {isMac ? (
                <span className="spantree-search-help-item-icon">⌘</span>
              ) : (
                "Ctrl"
              )}{" "}
              + P
            </code>{" "}
            to Search
          </span>
          <span className="spantree-search-help-item">
            <code>{isMac ? "return" : "Enter"}</code>to Open
          </span>
          <span className="spantree-search-help-item">
            <code>
              {isMac ? (
                <span className="spantree-search-help-item-icon">⌘</span>
              ) : (
                "Ctrl"
              )}{" "}
              + {isMac ? "return" : "Enter"}
            </code>
            to Open in New Tab
          </span>
        </div>
*/
