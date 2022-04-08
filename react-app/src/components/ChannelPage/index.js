import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

import EditChannelForm from "../EditChannelForm";
import CreateMessageForm from "../CreateMessageForm";
import EditMessageForm from "../EditMessageForm";
import { loadChannel, deleteMessage } from "../../store/channels";

import "./ChannelPage.css";
import ShowDBUser from "../ShowDBUser";
import { setCurrentModal, setCurrentModal2, showModal } from "../../store/modal";

const ChannelPage = () => {
  const dispatch = useDispatch();
  const { channel_id } = useParams();
  const channelId = parseInt(channel_id);
  const channel = useSelector((state) => state.channels[channel_id]);
  const members = useSelector(state => Object.values(state.channels));
  const user_id = useSelector((state) => state.session.user?.id);
  const choiceMember = members.find(person => person?.id === +channel_id)
  const users = channel?.users
  const memberCount = choiceMember?.users

  let messages;
  if (channel?.messages) {
    messages = Object.values(channel?.messages);
  }
  console.log(channel, '//////////////////')
  let images;
  if (channel?.users) {
    images = channel?.users
  }

  console.log(Object.values(images), '||||||||||||||||||||');

  let title = channel ? channel.title : "";
  let channelToEdit = channel ? channel : "";

  const ShowListOfUsers = () => {
    dispatch(setCurrentModal2(ShowDBUser, channelId));
    dispatch(showModal())
  }

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
        <div>

          <button onClick={ShowListOfUsers}>{memberCount?.length}
          </button>
        </div>
      </div>
      <div className="MessagesBody">
        {messages
          ?.slice(0)
          .reverse()
          .map((message) => (
            <div
              className="SingleMessageBody"
            >
              {images.map(pics => (
                pics.image_url ?
                  <div className="MessageProfile">
                    <img src={pics.image_url} alt='' />
                  </div> :
                  <div className="MessageProfile">
                    <i class="fa-solid fa-square-person-confined"></i>
                  </div>
              ))}
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
              <div
                className="EditMessageButton"
                id={"MessageEdit" + message.id}
              >
                {user_id === message.user_id && (
                  <>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </>
                )}
              </div>
            </div>
          ))}

      </div>
      {/* <ShowDBUser channelId={channelId} /> */}
      <CreateMessageForm channelId={channelId} />
    </div>
  );
};

export default ChannelPage;
