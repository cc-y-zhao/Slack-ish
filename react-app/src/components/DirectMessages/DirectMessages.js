import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
// import CreateChannelForm from "../CreateChannelForm";

import { loadChannels, deleteChannel } from "../../store/channels";

const DirectMessages = () => {
  const channels = useSelector((state) => Object.values(state.channels));
  const user_id = useSelector((state) => state.session.user.id);

  // const currentChannelId = function (url) {
  //   const parts = url.split("/");
  //   const last_part = parts[parts.length - 1];
  //   if (last_part === "") last_part = parts[parts.length - 2];

  //   return last_part;
  // };

  // const channelId = currentChannelId(window.location.pathname);

  // const [selected, setSelected] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChannels(user_id));
  }, [channels.toString()]);

  // TO DO: add individual routes for each channel with below syntax:
  // <NavLink key={channel.id} to={'/channels/' + channel.id}>

  return (
    <>
      <div>{/* <CreateDMForm /> */}</div>
      <div className="channels">
        {channels?.map((channel) => {
          return (
            channel.is_dm === true && (
              // <div className="channel__list" key={channel.id}>
              <NavLink
                to={`/channels/${channel.id}`}
                key={channel.id}
                className="channel__list"
                activeClassName="selected"
              >
                <div className="ChannelListItem">
                  <i class="fa-regular fa-face-smile"></i> {channel.title}
                </div>
              </NavLink>
              // </div>
            )
          );
        })}
      </div>
    </>
  );
};

export default DirectMessages;
