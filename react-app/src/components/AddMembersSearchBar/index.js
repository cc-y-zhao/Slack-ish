import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { addUserToChannel } from "../../store/channels";
import {
  loadUsersResults,
  loadChannelUsersResults,
  resetSearchInput,
} from "../../store/search";
import { loadChannel } from "../../store/channels";

import CreateChannelForm from "../CreateChannelForm";
import { showModal, hideSearchModal } from "../../store/modal";

function AddMembersSearchBar() {
  const history = useHistory();
  const dispatch = useDispatch();

  // these results only show people who are not already in the channel
  const results = useSelector((state) => state?.search.users_results);
  const channelId = useSelector((state) => state?.modals?.channelId);
  const currentChannelMembers = useSelector(
    (state) => state?.channels[channelId].users_in_channel
  );
  const [searchInput, setSearchInput] = useState("");
  const sessionUser = useSelector((state) => state.session.user);

  let sessionUserId;

  if (sessionUser) {
    sessionUserId = sessionUser.id;
  }

  const handleOnChange = async (inputValue, e) => {
    console.log(inputValue, e);
    e.preventDefault();
    setSearchInput(inputValue);
  };

  const handleClick = async (channelId, userId, firstName, lastName, e) => {
    e.preventDefault();

    try {
      addUserToChannel = await dispatch(addUserToChannel(channelId, userId));
    } catch (error) {}
    dispatch(resetSearchInput());
    if (addUserToChannel) {
      window.alert(`${firstName} ${lastName} was added to this channel!`);
      dispatch(loadChannel(channelId));
      // setSearchResult('');
      return dispatch(hideSearchModal());
      // dispatch(hideSearchModal()).then(() => dispatch(loadChannel(channelId)));
    }
  };

  useEffect(() => {
    if (searchInput) {
      dispatch(loadChannelUsersResults(channelId, searchInput));
    } else {
      dispatch(resetSearchInput());
    }
  }, [dispatch, searchInput]);

  return (
    <div>
      <div className="search">
        <div className="SearchBarArea">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            placeholder="Type to search users"
            value={searchInput}
            onChange={(e) => handleOnChange(e.target.value, e)}
          />
        </div>
        <div className="search__result">
          {results?.map((user) => (
            <div
              key={user.id}
              onClick={(e) =>
                handleClick(
                  channelId,
                  user.id,
                  user.first_name,
                  user.last_name,
                  e
                )
              }
              className="SearchResultDiv"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
              <div className="SearchName">
                {user.image_url ? (
                  <div className="SearchProfile">
                    <img
                      src={user.image_url}
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
                    <i class="fa-solid fa-square-person-confined"></i>
                  </div>
                )}
                {user.first_name} {user.last_name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddMembersSearchBar;
