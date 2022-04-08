import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadUsersResults } from "../../store/search";
import { hideSearchModal } from "../../store/modal";
import { createDm } from "../../store/channels";

import "./Search.css";

function Search() {
  const history = useHistory();
  const dispatch = useDispatch();

  const results = useSelector((state) => state?.search.users_results);

  const prevSearchInput = useSelector((state) => state?.search.search_input);
  const sessionUser = useSelector((state) => state.session.user);

  let sessionUserId;

  if (sessionUser) {
    sessionUserId = sessionUser.id;
  }

  // const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState(prevSearchInput);

  const handleClick = async (sessionUserId, resultId, e) => {
    e.preventDefault();

    let newDirectMessage;

    newDirectMessage = await dispatch(createDm(sessionUserId, resultId));

    if (newDirectMessage) {
      dispatch(hideSearchModal());
      // setSearchInput(null);
      history.push(`/channels/${newDirectMessage.id}`);
    }
  };

  // useEffect(() => {
  //   dispatch(loadUsersResults());
  // }, [dispatch]);

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
        <div className="SearchBarArea">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            placeholder="Type to search users"
            value={searchInput}
            // onClick={() => setShowModal(true)}
            onChange={(e) => dispatch(loadUsersResults(e.target.value))}
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
