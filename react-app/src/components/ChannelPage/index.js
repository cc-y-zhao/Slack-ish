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
  const channelId = parseInt(channel_id);

  const channel = useSelector((state) => state.channels[channel_id]);
  const user_id = useSelector((state) => state.session.user.id);

  // const messages = channel.messages;

  // console.log("messages in ChannelPage/index.js-------", messages)

  // console.log("channel in ChannelPage/index.js-------", channel?.messages);
  const messages = channel?.messages;
  // console.log("MESSAGES in ChannelPage/index.js-------", messages);

  let title = channel ? channel.title : "";
  let channelToEdit = channel ? channel : "";

  useEffect(() => {
    dispatch(loadChannel(channel_id));
  }, [dispatch, [channel].toString()]);
  // }, [channel_id, channel.all_messages.toString()]);

  // TO DO: add individual routes for each channel with below syntax:
  // <NavLink key={channel.id} to={'/channels/' + channel.id}>

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <EditChannelForm channelToEdit={channelToEdit} />
      </div>
      <div>Messages: </div>
      <div>
        {channel?.all_messages?.map((message) => (
          <div>
            <div>{message.name}: </div>
            <div>{message.content}</div>
          </div>
        ))}
      </div>
      <div>
        <CreateMessageForm channelId={channelId} />
      </div>
    </div>
  );
};

export default ChannelPage;
