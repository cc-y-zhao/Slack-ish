
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

import { hideModal, setCurrentModal } from "../../store/modal";

import { createChannel } from "../../store/channels";

import "./ShowDBUser.css";
import { loadUsersResults } from "../../store/search";

const ShowDBUser = ({ channelId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const channel = useSelector((state) => state.channels[channelId]);
  const members = useSelector(state => Object.values(state.channels));
  const choiceMember = members.find(person => person?.id === +channelId)
  const prevSearchInput = useSelector((state) => state?.search.search_input);
  const memberCount = choiceMember?.users
  const [searchInput, setSearchResult] = useState(prevSearchInput);

  return (
    <div className="ShowListOfUsers">
      <div className="search">
        <h2>{channel?.title}</h2>
        <input placeholder='Find members'
          value={prevSearchInput}
          onChange={(e) => dispatch(loadUsersResults(e.target.value))}
        />
        <h2>Search Results</h2>
        <div className="userlist__searchResult">
          <h3>Add people button </h3>
          {memberCount?.map(result => (
            <div key={result.id}>
              {result.first_name} {result.last_name}
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default ShowDBUser;
