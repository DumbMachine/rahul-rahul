import React from 'react'
import "./searchBarStyle.scss"
import GitHubIcon from "@material-ui/icons/GitHub";

const MAX_CHARS = 100;
const RESULT_COUNT = 5;
function IndivisualSearch(props) {
    const {
        index,
        iconUrl,
        targetUrl,
        titleText,
        source,
        snippetText,
        activeResult,
        setActiveResult,
        handleRedirect,
      } = props;
    
      // const resultClass =
      //   index === activeResult
      //     ? "searchBar__searchResults__item__active"
      //     : "searchBar__searchResults__item";
    
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
          // className={resultClass}
          onClick={() => {
            handleRedirect(targetUrl);
          }}
          onMouseEnter={() => {
            setActiveResult(index); 
          }}
        >
          <div className="searchBar__searchResults__item">
            <div className="searchBar__searchResults__item__title">
              <div className="searchBar__searchResults__item__title__iconHeaderWrapper">
                <div className="searchBar__searchResults__item__title__icon">
                 <img className="searchBar__searchResults__item__title__icon__img" src={iconUrl} alt="icons" />
                  {/* <GitHubIcon /> */}
                </div>

                <div className="searchBar__searchResults__item__title__header">
                  {titleText}
                </div>
              </div>
                <div className="searchBar__searchResults__item__title__source">
                  {source? source : "null"}
                </div>
            </div>
            <div className="searchBar__searchResults__item__subContent">
              <div>{formatedText(snippetText)}</div>
            </div>
          </div>
        </div>
      );
}

export default IndivisualSearch;