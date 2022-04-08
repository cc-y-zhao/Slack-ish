import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { loadUsersResults, resetSearchInput } from "../../store/search";

import { hideSearchModal } from "../../store/modal";
import { createDm } from "../../store/channels";

import "./Search.css";

function Search() {
  const history = useHistory();
  const dispatch = useDispatch();

  const results = useSelector((state) => state?.search.users_results);

  // const prevSearchInput = useSelector((state) => state?.search.search_input);
  const sessionUser = useSelector((state) => state.session.user);

  const [searchInput, setSearchInput] = useState("");

  // set search field to empty if showModal is false
  // const modalState = useSelector((state) => state?.modals);

  // if (modalState) {
  //   console.log('modal state search display----------', modalState['searchDisplay'])
  //   if (!modalState['searchDisplay'])
  //   setSearchInput('');
  // }

  let sessionUserId;

  if (sessionUser) {
    sessionUserId = sessionUser.id;
  }

  // const [showModal, setShowModal] = useState(false);

  const handleOnChange = async (inputValue, e) => {
    e.preventDefault();
    setSearchInput(inputValue)
  };

  const handleClick = async (sessionUserId, resultId, e) => {
    e.preventDefault();

    let newDirectMessage;

    dispatch(resetSearchInput());
    newDirectMessage = await dispatch(createDm(sessionUserId, resultId));

    if (newDirectMessage) {
      dispatch(hideSearchModal());
      history.push(`/channels/${newDirectMessage.id}`);
    }
  };

  useEffect(() => {
    if (searchInput) {
      dispatch(loadUsersResults(searchInput));
    }
  }, [dispatch, searchInput]);

  // From Dan:
  // useEffect allows you to run code between renders.. doesnt actually cause renders
  // console log inside useEffects

  // useEffect(() => {
  //   if (searchUsers.includes(searchInput)) {

  //   }
  // }, [searchInput])

  // once a name is selected, need to search join table to see if a channel_users intance exists
  // if message room doesn't exist, create new channel with hardcoded values (is_dm),
  // and then redirect / history.push them to that new channel

  return (
    <div>
      <div className="search">
        {/* // LOOK AT THIS */}
        {/* <input
          placeholder="Search"
          value={searchInput}
          // onClick={() => setShowModal(true)}
          onChange={(e) => handleOnChange(e.target.value, e)}
          // onChange -> dispatch for the results and then setSearchResult to those results
        /> */}

        <div className="SearchBarArea">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            placeholder="Type to search users"
            value={searchInput}
            // onClick={() => setShowModal(true)}
            // onChange={(e) => dispatch(loadUsersResults(e.target.value))}
            onChange={(e) => handleOnChange(e.target.value, e)}

            // onChange -> dispatch for the results and then setSearchResult to those results
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
                  <i class="fa-solid fa-magnifying-glass"></i>
                  <div className="SearchName">
                    {result.first_name} {result.last_name}
                  </div>
                </div>
              ))}
            </>
          )}
          {/* <>
            {results?.map((result) => (
              <div
                key={result.id}
                onClick={(e) => handleClick(sessionUserId, result.id, e)}
                className="SearchResultDiv"
              >
                <i class="fa-solid fa-magnifying-glass"></i>
                <div className="SearchName">
                  {result.first_name} {result.last_name}
                </div>
              </div>
            ))}
          </> */}
        </div>
        {/* <h2>All Users: (for testing)</h2>
        <div className="search__result">
          {users?.map(user => (
            <div key={user.id}>
              {user.first_name} {user.last_name}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Search;
