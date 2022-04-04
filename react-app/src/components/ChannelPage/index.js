import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

import EditChannelForm from "../EditChannelForm";
import CreateMessageForm from "../CreateMessageForm";
import { loadChannel } from "../../store/channels";

const ChannelPage = () => {
  const dispatch = useDispatch();
  const { channel_id } = useParams();

  const channel = useSelector((state) => state.channels[channel_id]);
  const user_id = useSelector((state) => state.session.user.id);

  // const messages = channel.messages;

  // console.log("messages in ChannelPage/index.js-------", messages)


  // console.log("channel in ChannelPage/index.js-------", channel);
  // console.log("messages in ChannelPage/index.js-------", channel.channel_id.messages);

  let title = channel ? channel.title : ''
  let channelToEdit = channel ? channel : ''


  useEffect(() => {
    dispatch(loadChannel(channel_id));
  }, [dispatch, [channel].toString(), [channel.messages].toString()]);


  // TO DO: add individual routes for each channel with below syntax:
  // <NavLink key={channel.id} to={'/channels/' + channel.id}>

  return (
    <div>
      <h2>{title}</h2>
      <div><EditChannelForm channelToEdit={channelToEdit} /></div>
      <div>Messages: </div>
      <div>
        {channel?.messages.map((message) => (
          <div>
            <div>{message.name}: </div>
            <div>{message.content}</div>
          </div>
        ))}
      </div>
      <div><CreateMessageForm channelId={channel_id}/></div>
    </div>
  );
};

export default ChannelPage;
