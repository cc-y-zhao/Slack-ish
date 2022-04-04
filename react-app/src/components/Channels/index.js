import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './Channels.css'
import CreateChannelForm from "../CreateChannelForm";

import { loadChannels, deleteChannel } from "../../store/channels";

const Channels = () => {
  const channels = useSelector((state) => Object.values(state.channels));
  const user_id = useSelector((state) => state.session.user.id);

  const dispatch = useDispatch();

  console.log("channels in channels/index.js-------", channels);

  useEffect(() => {
    dispatch(loadChannels());
  }, [channels.toString()]);

  // TO DO: add individual routes for each channel with below syntax:
  // <NavLink key={channel.id} to={'/channels/' + channel.id}>

  return (
    <div>
      <div>
        {/* <CreateChannelForm /> */}
      </div>
      {/* <div>Channels list: </div> */}
      <div>
        {channels?.map((channel) => {
          return (
            channel.owner_id === user_id && (
              <div className='channel__list' key={channel.id}>
                <h4>{channel.title}</h4>
                {/* {channel.owner_id === user_id && (
                  <button
                    onClick={async () => {
                      await dispatch(deleteChannel(channel.id));
                    }}
                  >
                    Delete
                  </button>
                )} */}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Channels;
