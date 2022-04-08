import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Channels.css";

import { loadChannels } from "../../store/channels";

const Channels = () => {
  const channels = useSelector((state) => Object.values(state.channels));
  const user_id = useSelector((state) => state.session.user.id);

  const dispatch = useDispatch();

  // const [selected, setSelected] = useState(true);

  useEffect(() => {
    dispatch(loadChannels(user_id));
  }, [channels.toString()]);

  // TO DO: add individual routes for each channel with below syntax:
  // <NavLink key={channel.id} to={'/channels/' + channel.id}>

  return (
    <>
      <div className="channels">
        {channels?.map((channel) => {
          return (
            channel.is_dm === false && (
              // <div className="channel__list" key={channel.id}>
              <NavLink
                to={`/channels/${channel.id}`}
                key={channel.id}
                className="channel__list"
                activeClassName="selected"
              >
                <div className="ChannelListItem">
                  <i class="fa-solid fa-hashtag"></i>
                  {channel.title}
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

export default Channels;
