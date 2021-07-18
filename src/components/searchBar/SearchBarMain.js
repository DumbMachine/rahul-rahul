import React, { useRef, useState, useEffect, useCallback } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";


import GitHubIcon from "./assets/mark-github.svg";
import GmailIcon from "./assets/GmailIcon.svg";
import settingIcon from "./assets/Frame.svg";
import SelectIcon from "./assets/Vector.svg";
import navigateIcon from "./assets/Vector (1).svg";

import IndivisualSearch  from "./IndivisualSearch";
import "./searchBarStyle.scss";

const MAX_CHARS = 100;
const RESULT_COUNT = 5;
const allResults = [
  {
    iconUrl: GitHubIcon,
    targetUrl: "https://www.youtube.com/watch?v=GBpoKvqt4Ws",
    snippetText: "This is snippetText",
    titleText: "This is titleText",
    source: "Github/DumbMachineProj"
  },
  {
    iconUrl: GmailIcon,
    targetUrl: "https://www.youtube.com/watch?v=GBpoKvqt4Ws",
    snippetText: "This is snippetText but another",
    titleText: "This is titleText but another",
    source: "Gmail/ratin11999"
  },
];

const handleRedirect = (targetUrl, inNewTab) => {
  if (targetUrl) {
    if (inNewTab) {
      window.open(targetUrl, "_blank");
      window.focus();
    } else {
      window.location.href = targetUrl;
    }
  } else {
    console.error("InValidActiveResult", { targetUrl, inNewTab });
  }
};

function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}




function SearchResult(props) {
  const {
    index,
    iconUrl,
    targetUrl,
    titleText,
    snippetText,
    activeResult,
    setActiveResult,
    handleRedirect,
  } = props;

  const resultClass =
    index === activeResult
      ? "searchBar__searchResults__item__active"
      : "searchBar__searchResults__item";

  const formatedText = (text) => {
    if (text.length <= MAX_CHARS) {
      return text;
    } else {
      const extraChars = (text.length - MAX_CHARS) / 2;
      const midLen = text.length / 2;
      return (
        text.slice(0, midLen - extraChars) +
        " ... " +
        text.slice(midLen + extraChars)
      );
    }
  };
  return (
    <div
      className={resultClass}
      onClick={() => {
        handleRedirect(targetUrl);
      }}
      onMouseEnter={() => {
        setActiveResult(index);
      }}
    >
      <div className="searchBar__searchResults__item">
        <div className="searchBar__searchResults__item__title">
          <div className="searchBar__searchResults__item__title__icon">
            {/* iconUrl */}
            <GitHubIcon />
          </div>
          <div className="searchBar__searchResults__item__title__header">
            {titleText}
          </div>
        </div>
        <div className="searchBar__searchResults__item__subContent">
          <div>{formatedText(snippetText)}</div>
        </div>
      </div>
    </div>
  );
}



async function getSearchResults() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(allResults);
    }, 300)
  );
}

function SearchBarMain() {
  const [searchFor, setSearchFor] = useState("");
  const [activeResult, setActiveResult] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  const [showSearchbar, setShowSearchbar] = useState(true);
  const [resultsLoading, setResultsLoading] = useState(null);
  const [debounceTimerId, setDebounceTimerId] = useState(null);

  const isMac = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].reduce(
    (accumulator, currentValue) => {
      return (
        window.navigator.platform.indexOf(currentValue) !== -1 || accumulator
      );
    },
    false
  );

  // TODO: Scroll out of screen support, !blame abhi
  useEffect(() => {
    console.log("status of activeResult: ", activeResult);
    // const activeItem = document.querySelector("NAME_OF_SEARCH_RESULT_CLASS");
    // if (activeItem) {
    //   activeItem.scrollIntoView({
    //     behavior: "auto", // Defines the transition animation.
    //     block: "nearest", // Defines vertical alignment.
    //     inline: "start", // Defines horizontal alignment.
    //   });
    // }
  }, [activeResult]);

  useEffect(() => { 
    setResultsLoading(true);
    getSearchResults().then((results) => {
      setSearchResults(results);
      setResultsLoading(false);
    });
  }, [searchFor]);

  // TODO: Debounce API, mid call interfering another call
  // useEffect(() => {
  //   setActiveResult(0);
  //   debouncedWorkerCall();
  // }, [searchFor.replace(/ /g, "")]);

  const handleKeyDown = useCallback(
    (event) => {
      const isActionKey = isMac ? event.metaKey : event.ctrlKey;
      if (isActionKey && (event.key === "p" || event.key === "P")) {
        event.preventDefault();
        setShowSearchbar(true);
      } else if (isActionKey && event.key === "Enter" && showSearchbar) {
        handleRedirect(searchResults[activeResult].targetUrl, true);
      } else if (event.key === "Enter" && showSearchbar) {
        handleRedirect(searchResults[activeResult].targetUrl, false);
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
    [activeResult, searchResults]
  );

  useEventListener("keydown", handleKeyDown);

  return (
    <div
    className="searchBarWrapper"
      // style={{
      //   height: "512px",
      //   width: "731px",
      //   borderRadius: "16px",
      //   background:"#292731"
      // }}
    >
      <div className="searchBar">
        <div className="searchBar__searchInput">
          <div className="searchBar__searchInput__iconInputWrapper">
            <SearchIcon style={{ color: "white" }} />
            <input
              className="searchBar__searchInput__bar"
              type="text"
              value={searchFor}
              placeholder=" Search files, apps, bookmarks, history, and preferences (ALt+S)"
              onChange={(e) => setSearchFor(e.target.value)}
              autoFocus
            />
          </div>
          <CancelIcon style={{ color: "white" }} onClick={()=> setSearchFor("")} />
        </div>

        <div className="searchBar__filter">
          <div className="searchBar__filter__filterItem">
          <img className="searchBar__filter__filterItem__icon" src={navigateIcon} alt="navigationicon" />
            Navigate
          </div>
          <div className="searchBar__filter__filterItem">
          <img className="searchBar__filter__filterItem__icon" src={SelectIcon} alt="select Icon" />
            Select
          </div>
        </div>
        {resultsLoading ? (
          "Result Loader"
        ) : (
          <div className="searchBar__searchResults">
            {searchResults
              .slice(0, RESULT_COUNT)
              .map((item, itemLocalIndex) => {
                return (
                  <IndivisualSearch
                    key={itemLocalIndex}  
                    source={item.source}
                    index={itemLocalIndex}
                    iconUrl={item.iconUrl}
                    targetUrl={item.targetUrl}
                    snippetText={item.snippetText}
                    titleText={item.titleText}
                    activeResult={activeResult}
                    handleRedirect={handleRedirect}
                    setActiveResult={setActiveResult}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBarMain;
