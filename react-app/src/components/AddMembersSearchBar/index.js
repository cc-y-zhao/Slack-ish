import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { addUserToChannel } from "../../store/channels";
import { loadUsersResults, loadChannelUsersResults } from "../../store/search";
import { loadChannel } from "../../store/channels";

import CreateChannelForm from "../CreateChannelForm";
import { showModal, hideSearchModal } from "../../store/modal";

function AddMembersSearchBar() {
  const history = useHistory();
  const dispatch = useDispatch();

  // these results only show people who are not already in the channel
  const results = useSelector((state) => state?.search.users_list);
  const channelId = useSelector((state) => state?.modals?.channelId);
  const currentChannelMembers = useSelector((state) => state?.channels[channelId].users_in_channel);

  const prevSearchInput = useSelector((state) => state?.search.search_input);
  const sessionUser = useSelector((state) => state.session.user)

  // let allUsersArray = [];
  // if (allUsers) {
  //   allUsersArray = Object.values(allUsers);
  // }

  // let currentChannelEmails = [];
  // currentChannelMembers.forEach((user) => {
  //   currentChannelEmails.push(user.email);
  // })

  // let usersNotInChannel = [];

  // allUsersArray.forEach((user) => {
  //   // console.log('user in for each--------', user)
  //   if (!currentChannelEmails.includes(user.email)) {
  //     usersNotInChannel.push(user)
  //   }
  // })


  let sessionUserId;

  if (sessionUser) {
    sessionUserId = sessionUser.id
  }

  const [searchInput, setSearchResult] = useState(prevSearchInput);

  useEffect(() => {
    dispatch(loadChannelUsersResults(channelId));
  }, [dispatch]);

  const handleClick = async (channelId, userId, e) => {
    e.preventDefault();

    try {
      addUserToChannel = await dispatch(addUserToChannel(channelId, userId));
    } catch (error) {

    }
    if (addUserToChannel) {
      dispatch(loadChannel(channelId));
      setSearchResult('');
      return dispatch(hideSearchModal());
      // dispatch(hideSearchModal()).then(() => dispatch(loadChannel(channelId)));
    }
  };
  // loadChannel(channelId)
  // hideSearchModal()

  return (
    <div>
      <div className="search">
        <h3>Add Members</h3>
        <input placeholder='Search'
          value={searchInput}
          onChange={(e) => dispatch(loadUsersResults(e.target.value))}
        />
          <div className="search__result">
          {results?.map(user => (
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
