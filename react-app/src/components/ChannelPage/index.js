import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

import EditChannelForm from "../EditChannelForm";
import { loadChannel } from "../../store/channels";

const ChannelPage = () => {
  //TO DO: ONLY CHANNEL OWNER SHOULD BE ABLE TO SEE THE EDITCHANNELFORM
  const dispatch = useDispatch();
  const { channel_id } = useParams();

  const channel = useSelector((state) => state.channels[channel_id]);
  const user_id = useSelector((state) => state.session.user.id);


  console.log("channel in ChannelPage/index.js-------", [channel]);

  let title = channel ? channel.title : ''
  let channelToEdit = channel ? channel : ''


  useEffect(() => {
    dispatch(loadChannel(channel_id));
  }, [dispatch, [channel].toString()]);


  // TO DO: add individual routes for each channel with below syntax:
  // <NavLink key={channel.id} to={'/channels/' + channel.id}>

  return (
    <div>
      <h2>{title}</h2>
      <div><EditChannelForm channelToEdit={channelToEdit} /></div>
    </div>
  );
};

export default ChannelPage;
