import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
// import CreateChannelForm from "../CreateChannelForm";

import { loadChannels, deleteChannel } from "../../store/channels";

const DirectMessages = () => {
  const channels = useSelector((state) => Object.values(state.channels));
  const user_id = useSelector((state) => state.session.user.id);
  const user_name = useSelector((state) => state.session.user.first_name)
  console.log(user_name);

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
           ( channel.is_dm === true) && (channel.title.includes(user_name)) ? (
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
            ) : null
          );
        })}
      </div>
    </>
  );
};

export default DirectMessages;
