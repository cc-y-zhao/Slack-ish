import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";

import { hideModal, setCurrentModal } from "../../store/modal";

import { createChannel } from "../../store/channels";

import { loadUsersResults } from "../../store/search";
import Search from "../Search";

import "./ChannelMembers.css";

const ChannelMembers = () => {
  // const ChannelMembers = ({ channelId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const channelId = useSelector((state) => state?.modals?.channelId);
  const channel = useSelector((state) => state.channels[channelId]);
  const members = channel?.users_in_channel;
  const totalMembers = members?.length;

  console.log("channel-------------------", channel);
  console.log("members-------------------", members);

  // const prevSearchInput = useSelector((state) => state?.search.search_input);
  // console.log('totalMembers in channelmemebrs', totalMembers);
  // const [searchInput, setSearchResult] = useState(prevSearchInput);

  return (
    <div className="MembersWrapper">
      <div className="MembersTitle">
        {/* <input placeholder='Find members'
          value={prevSearchInput}
          onChange={(e) => dispatch(loadUsersResults(e.target.value))}
        /> */}
        <h2>All Members of {channel.title}</h2>
      </div>
      <div className="MembersBody">
        {members?.map((result) => (
          <div key={result?.id}>
            <div className="MemberNameBody">
              {result.image_url ? (
                <div className="MemberProfile">
                  <img
                    src={result.image_url}
                    alt=""
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              ) : (
                <div className="MemberProfile">
                  <i class="fa-solid fa-square-person-confined"></i>
                </div>
              )}
              {result.first_name} {result.last_name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelMembers;
