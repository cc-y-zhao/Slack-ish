import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

import EditChannelForm from "../EditChannelForm";
import CreateMessageForm from "../CreateMessageForm";
import EditMessageForm from "../EditMessageForm";
import { loadChannel, deleteMessage } from "../../store/channels";

import "./ChannelPage.css";

const ChannelPage = () => {
  const dispatch = useDispatch();
  const { channel_id } = useParams();
  const channelId = parseInt(channel_id);

  const channel = useSelector((state) => state.channels[channel_id]);
  const user_id = useSelector((state) => state.session.user.id);
  // const messages = channel.messages;

  // console.log("messages in ChannelPage/index.js-------", messages) 

  // console.log("channel in ChannelPage/index.js-------", channel?.messages);
  let messages;
  if (channel?.messages) {
    messages = Object.values(channel?.messages);
  }
  console.log("MESSAGES in ChannelPage/index.js-------", messages);

  let title = channel ? channel.title : "";
  let channelToEdit = channel ? channel : "";

  useEffect(() => {
    dispatch(loadChannel(channel_id));
  }, [dispatch, channel_id]);
  // }, [channel_id, channel.all_messages.toString()]);

  function formatTime(string) {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(string).toLocaleTimeString([], options);
  }

  function formatDate(string) {
    const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    return new Date(string).toLocaleDateString([], options);
  }

  return (
    <div className="ChannelPageBody">
      <div className="ChannelPageTitle">
        <i class="fa-solid fa-hashtag"></i>
        <h2>{title}</h2>
      </div>
      <div>
        <EditChannelForm channelToEdit={channelToEdit} />
      </div>
      <div className="MessagesBody">
        {messages
          ?.slice(0)
          .reverse()
          .map((message) => (
            <div className="SingleMessageBody">
              <div className="MessageProfile">
                <i class="fa-solid fa-square-person-confined"></i>
              </div>
              <div className="MessageMain">
                <div className="MessageInfo">
                  <div className="MessageName">{message.name}</div>
                  <div className="MessageTime">
                    {formatTime(message.time_created)}{" "}
                  </div>
                  <div className="MessageTime">
                    {formatDate(message.time_created)}
                  </div>
                </div>
                <div className="MessageContent">{message.content}</div>
              </div>
              <div>
                <EditMessageForm
                  channelId={channelId}
                  messageToEdit={message}
                />
              </div>
              <button
                onClick={async () => {
                  await dispatch(deleteMessage(channel.id, message.id)).then(
                    () => dispatch(loadChannel(channel_id))
                  );
                }}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
      <CreateMessageForm channelId={channelId} />
    </div>
  );
};

export default ChannelPage;
