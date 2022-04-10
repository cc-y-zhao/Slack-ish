import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import { loadUsersResults, resetSearchInput } from "../../store/search";

import { hideSearchModal } from "../../store/modal";
import { createDm, loadChannel } from "../../store/channels";

import "./Search.css";
import icon from "../../images/icon.png";

function Search() {
  const history = useHistory();
  const dispatch = useDispatch();

  const results = useSelector((state) => state?.search.users_results);
  const sessionUser = useSelector((state) => state.session.user);

  const [searchInput, setSearchInput] = useState("");

  let sessionUserId;

  if (sessionUser) {
    sessionUserId = sessionUser.id;
  }

  const handleOnChange = async (inputValue, e) => {
    e.preventDefault();
    setSearchInput(inputValue);
  };

  const handleClick = async (sessionUserId, resultId, e) => {
    e.preventDefault();

    let newDirectMessage;

    dispatch(resetSearchInput());
    newDirectMessage = await dispatch(createDm(sessionUserId, resultId));

    if (newDirectMessage) {
      await dispatch(loadChannel(newDirectMessage.id))
      await dispatch(hideSearchModal());
      history.push(`/channels/${newDirectMessage.id}`);
    }
  };

  useEffect(() => {
    if (searchInput) {
      dispatch(loadUsersResults(searchInput));
    } else {
      dispatch(resetSearchInput());
    }
  }, [dispatch, searchInput]);

  return (
    <div>
      <div className="search">
        <div className="SearchBarArea">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            placeholder="Type to search users"
            value={searchInput}
            onChange={(e) => handleOnChange(e.target.value, e)}
          />
        </div>
        <div className="search__result">
          {results && (
            <>
              {results?.map((result) => (
                <div
                  key={result.id}
                  onClick={(e) => handleClick(sessionUserId, result.id, e)}
                  className="SearchResultDiv"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <div className="SearchName">
                    {result.image_url ? (
                      <div className="SearchProfile">
                        <img
                          src={result.image_url}
                          onError={(e) => {
                            e.target.setAttribute("src", icon);
                          }}
                          alt=""
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    ) : (
                      <div className="SearchProfile">
                        <i className="fa-solid fa-square-person-confined"></i>
                      </div>
                    )}
                    {result.first_name} {result.last_name}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
