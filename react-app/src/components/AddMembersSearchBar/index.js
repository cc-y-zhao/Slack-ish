import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

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


  let sessionUserId;

  if (sessionUser) {
    sessionUserId = sessionUser.id
  }

  const [searchInput, setSearchResult] = useState(prevSearchInput);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const handleClick = async (sessionUserId, resultId, e) => {
    e.preventDefault();

    // let newDirectMessage;

    // try {
    //   newDirectMessage = await dispatch(createDm(sessionUserId, resultId));
    // } catch (error) {

    // }
    // if (newDirectMessage) {

    //   history.push(`/channels/${newDirectMessage.id}`)
    // }
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
          {allResults?.map(result => (
            <div key={result.id} onClick={(e) => handleClick(sessionUserId, result.id, e)}>
              {result.first_name} {result.last_name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default AddMembersSearchBar;
