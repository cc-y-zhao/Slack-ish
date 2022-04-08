import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { addUserToChannel } from "../../store/channels";
import { loadUsersResults, loadUsers } from "../../store/search";

import CreateChannelForm from "../CreateChannelForm";
import { showModal } from "../../store/modal";

function AddMembersSearchBar() {
  const history = useHistory();
  const dispatch = useDispatch();

  // these results only show people who are not already in the channel
  const allResults = useSelector((state) => state?.search.users_results);
  const allUsers = useSelector((state) => state?.search.users);
  const channelId = useSelector((state) => state?.modals?.channelId);
  const currentChannelMembers = useSelector((state) => state?.channels[channelId].users);

  const prevSearchInput = useSelector((state) => state?.search.search_input);
  const sessionUser = useSelector((state) => state.session.user)

  let allUsersArray = [];
  if (allUsers) {
    allUsersArray = Object.values(allUsers);
  }

  let currentChannelEmails = [];
  currentChannelMembers.forEach((user) => {
    currentChannelEmails.push(user.email);
  })

  let usersNotInChannel = [];

  allUsersArray.forEach((user) => {
    // console.log('user in for each--------', user)
    if (!currentChannelEmails.includes(user.email)) {
      usersNotInChannel.push(user)
    }
  })

  console.log('users not in cahnnel', usersNotInChannel);


  let sessionUserId;

  if (sessionUser) {
    sessionUserId = sessionUser.id
  }

  const [searchInput, setSearchResult] = useState(prevSearchInput);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const handleClick = async (channelId, userId, e) => {
    e.preventDefault();

    try {
      addUserToChannel = await dispatch(addUserToChannel(channelId, userId));
    } catch (error) {

    }
    if (addUserToChannel) {
      history.push(`/channels/${channelId}`)
    }
  };


  return (
    <div>
      <div className="search">
        <h3>Add Members</h3>
        <input placeholder='Search'
          value={searchInput}
          onChange={(e) => dispatch(loadUsersResults(e.target.value))}
        />
          <div className="search__result">
          {usersNotInChannel?.map(user => (
            <div key={user.id} onClick={(e) => handleClick(channelId, user.id, e)}>
              {user.first_name} {user.last_name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default AddMembersSearchBar;
