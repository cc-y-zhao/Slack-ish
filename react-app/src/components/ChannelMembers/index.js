import React from "react";
import { useSelector } from "react-redux";

import "./ChannelMembers.css";
import icon from "../../images/icon.png";

const ChannelMembers = () => {
  const channelId = useSelector((state) => state?.modals?.channelId);
  const channel = useSelector((state) => state.channels[channelId]);
  const members = channel?.users_in_channel;

  return (
    <div className="MembersWrapper">
      <div className="MembersTitle">
        <i class="fa-solid fa-hashtag"></i>
        <h2>{channel.title}</h2>
      </div>
      <div className="MembersBody">
        {members?.map((result) => (
          <div key={result?.id}>
            <div className="MemberNameBody">
              {result.image_url ? (
                <div className="MemberProfile">
                  <img
                    src={result.image_url}
                    onError={(e) => {
                      e.target.setAttribute("src", icon);
                    }}
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
