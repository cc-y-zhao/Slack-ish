import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

import EditChannelForm from "../EditChannelForm";
import CreateMessageForm from "../CreateMessageForm";
import EditMessageForm from "../EditMessageForm";
import ChannelMembers from "./ChannelMembers"
import { loadChannel, deleteMessage } from "../../store/channels";

import { showModal, showSearchModal } from "../../store/modal";
import AddMembersSearchBar from "../AddMembersSearchBar";
import { setAddMembersChannelSearchModal } from "../../store/modal";

import "./ChannelPage.css";

const ChannelPage = () => {
  const dispatch = useDispatch();
  const { channel_id } = useParams();
  const channelId = parseInt(channel_id);
  const channel = useSelector((state) => state.channels[channel_id]);
  const user_id = useSelector((state) => state.session.user?.id);
  const members = useSelector(state => Object.values(state.channels));
  const choiceMember = members.find(person => person?.id === +channel_id)
  const memberCount = choiceMember?.users

  let messages;
  if (channel?.messages) {
    messages = Object.values(channel?.messages);
  }

  let title = channel ? channel.title : "";
  let channelToEdit = channel ? channel : "";

  useEffect(() => {
    dispatch(loadChannel(channel_id));
  }, [dispatch, channel_id]);

  function formatTime(string) {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(string).toLocaleTimeString([], options);
  }

  function formatDate(string) {
    const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    return new Date(string).toLocaleDateString([], options);
  }
  ////////////// ADD MEMBERS TO CHANNEL SECTION //////////////////
  let addChannelMembersButton = false;
  if (channel?.is_dm == false) {
    addChannelMembersButton = true;
  }

  const ShowChannelMembers = () => {
    dispatch(setCurrentModal2(ShowDBUser, channelId));
    dispatch(showSearchModal())
  }

  const showAddMembersSearchBar = () => {
    dispatch(setAddMembersChannelSearchModal(AddMembersSearchBar, channelId));
    dispatch(showSearchModal());
  }

  return (
    <div className="ChannelPageBody">
      <div className="ChannelPageTitle">
        <i class="fa-solid fa-hashtag"></i>
        <h2>{title}</h2>
        <div>
          {addChannelMembersButton &&
            <button onClick={showAddMembersSearchBar}>
              Add Members
            </button>
          }
        </div>
        <div>
          <button onClick={ShowChannelMembers}>{memberCount?.length}
            <ChannelMembers channelId={channelId}/>
          </button>
        </div>
        <div>
          <i class="fa-solid fa-ellipsis-vertical"></i>
          {/* <div>
            <EditChannelForm channelToEdit={channelToEdit} />
          </div> */}
        </div>
      </div>
      <div className="MessagesBody">
        {messages
          ?.slice(0)
          .reverse()
          .map((message) => (
            <div
              className="SingleMessageBody"
              // onMouseEnter={() => setShowEditMessage(true)}
              // onMouseLeave={() => setShowEditMessage(false)}
            >
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
              <div
                className="EditMessageButton"
                id={"MessageEdit" + message.id}
              >
                {user_id === message.user_id && (
                  <>
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                    {/* <div>
                      <EditMessageForm
                        channelId={channelId}
                        messageToEdit={message}
                      />
                      <button
                        onClick={async () => {
                          await dispatch(
                            deleteMessage(channel.id, message.id)
                          ).then(() => dispatch(loadChannel(channel_id)));
                        }}
                      >
                        Delete
                      </button>
                    </div> */}
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
      <CreateMessageForm channelId={channelId} />
    </div>
  );
};

export default ChannelPage;
