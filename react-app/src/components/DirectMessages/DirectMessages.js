import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import CreateChannelForm from "../CreateChannelForm";

import { loadChannels, deleteChannel } from "../../store/channels";

const DirectMessages = () => {
  const channels = useSelector((state) => Object.values(state.channels));
  const user_id = useSelector((state) => state.session.user.id);

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
              <div className="channel__list" key={channel.id}>
                <NavLink to={`/channels/${channel.id}`}>
                  <li>
                    <i class="fa-regular fa-face-smile"></i> {channel.title}
                  </li>
                </NavLink>
              </div>
            )
          );
        })}
      </div>
    </>
  );
};

export default DirectMessages;
