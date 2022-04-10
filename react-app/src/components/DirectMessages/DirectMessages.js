import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { loadChannels } from "../../store/channels";

const DirectMessages = () => {
  const channels = useSelector((state) => Object.values(state.channels));
  const user_id = useSelector((state) => state.session.user.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChannels(user_id));
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
            channel.is_dm === true && (
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
            )
          );
        })}
      </div>
    </>
  );
};

export default DirectMessages;
