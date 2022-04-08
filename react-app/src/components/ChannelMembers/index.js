
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

import { hideModal, setCurrentModal } from "../../store/modal";

import { createChannel } from "../../store/channels";

import "./ChannelMembers.css";
import { loadUsersResults } from "../../store/search";
import Search from "../Search";

const ChannelMembers = ({ channelId }) => {
// const ChannelMembers = ({ channelId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const channel = useSelector((state) => state.channels[channelId]);
  const members = useSelector(state => Object.values(state.channels));
  const choiceMember = members.find(person => person?.id === channelId)
  const prevSearchInput = useSelector((state) => state?.search.search_input);
  const memberCount = choiceMember?.users
  const [searchInput, setSearchResult] = useState(prevSearchInput);
  // useEffect(() => {
  //   dispatch()
  // })

  return (
    <div className="ShowListOfUsers">
      <div className="search">
        <h3>{choiceMember?.title}</h3>
        <input placeholder='Find members'
          value={prevSearchInput}
          onChange={(e) => dispatch(loadUsersResults(e.target.value))}
        />
        <h2>Search Results</h2>
        <h3>Add people button </h3>
        <div className="userlist__searchResult">
          {memberCount?.map(result => (
            <div key={result?.id}>
              <li>{result?.first_name} {result?.last_name}</li>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default ChannelMembers;
