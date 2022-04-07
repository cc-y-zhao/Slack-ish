import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { loadUsersResults } from "../../store/search";

import CreateChannelForm from "../CreateChannelForm";
import { showModal } from "../../store/modal";

function AddMembersSearchBar() {
  const history = useHistory();
  const dispatch = useDispatch();


  // these results only show people who are not already in the channel
  const allResults = useSelector((state) => state?.search.users_results);
  const channelsState = useSelector((state) => state?.channels?.channelId);
  // const channelId = useSelector((state) => state?.modals?.channelId);

  // console.log('channel id --------------', channelId);
  console.log('channelsState------------------', channelsState);
  // console.log('channelsState.channelId------------------', channelsState.channelId);

  // console.log('channel id --------------', channelId);
  // let currentChannel;
  // if (channelsState) {
  //   currentChannel = channelsState[channelId];
  // }

  // console.log('currentChannel----------------', currentChannel)

  const prevSearchInput = useSelector((state) => state?.search.search_input);
  const sessionUser = useSelector((state) => state.session.user)

  let sessionUserId;

  if (sessionUser) {
    sessionUserId = sessionUser.id
  }

  const [searchInput, setSearchResult] = useState(prevSearchInput);

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
