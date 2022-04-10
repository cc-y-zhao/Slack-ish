import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Channels.css";

import { loadChannels } from "../../store/channels";

const Channels = () => {
  const history = useHistory();
  const channels = useSelector((state) => Object.values(state.channels));
  const user_id = useSelector((state) => state.session.user.id);
  if (!user_id) {
    history.push("/login");
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChannels());
  }, [channels.toString()]);

  let showChannels = [];
  if (channels) {
    channels.forEach((channel) => {
      if (channel["users_ids"]?.includes(user_id)) {
        showChannels.push(channel);
      }
    });
  }

  return (
    <>
      <div className="channels">
        {showChannels?.map((channel) => {
          return (
            channel.is_dm === false && (
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
            )
          );
        })}
      </div>
    </>
  );
};

export default Channels;
