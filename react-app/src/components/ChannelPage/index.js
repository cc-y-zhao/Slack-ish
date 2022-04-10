import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import EditChannelForm from "../EditChannelForm";
import CreateMessageForm from "../CreateMessageForm";
import EditMessageForm from "../EditMessageForm";

import ChannelMembers from "../ChannelMembers";
import { loadChannel } from "../../store/channels";

import {
  showModal,
  showSearchModal,
  setCurrentEditModal,
} from "../../store/modal";
import AddMembersSearchBar from "../AddMembersSearchBar";
import {
  setAddMembersChannelSearchModal,
  setChannelUsersSearchModal,
} from "../../store/modal";

import "./ChannelPage.css";

const ChannelPage = () => {
  const dispatch = useDispatch();
  const { channel_id } = useParams();
  const channelId = parseInt(channel_id);
  const channel = useSelector((state) => state.channels[channel_id]);
  const user_id = useSelector((state) => state.session.user?.id);
  const members = channel?.users_in_channel;
  const totalMembers = `(${members?.length})`;

  const state = useSelector((state) => state);


  console.log('STATE-------------------', state)
  console.log('CHANNEL---------------------', channel);

  const showEditChannelForm = () => {
    dispatch(setCurrentEditModal(EditChannelForm, channel?.id));
    dispatch(showModal());
  };

  let messages;
  if (channel?.messages) {
    messages = Object.values(channel?.messages);
  }

  let title = channel ? channel.title : "";
  let description = channel ? channel.description : "";

  useEffect(() => {
    dispatch(loadChannel(channel_id));
  }, [dispatch, totalMembers, channel_id]);

  function formatTime(string) {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(string).toLocaleTimeString([], options);
  }

  function formatDate(string) {
    const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    return new Date(string).toLocaleDateString([], options);
  }
  ////////////// ADD MEMBERS TO CHANNEL SECTION ///////////////////
  let addChannelMembersButton = false;
  if (channel?.is_dm === false) {
    addChannelMembersButton = true;
  }

  const ShowChannelMembers = () => {
    dispatch(setChannelUsersSearchModal(ChannelMembers, channelId));
    dispatch(showSearchModal());
  };

  const showAddMembersSearchBar = () => {
    dispatch(setAddMembersChannelSearchModal(AddMembersSearchBar, channelId));
    dispatch(showSearchModal());
  };

  if (!user_id) {
    return <Redirect to="/login" />;
  }

  let showChannel = false;

  if (channel && channel['users_ids']) {
     if (channel["users_ids"]?.includes(user_id))
    showChannel = true;
  } else {
    return <Redirect to="/channels/1" />;
  }

  return (
    <>
      {showChannel && (
        <div className="ChannelPageBody">
          <div className="ChannelPageTitle">
            <div className="ChannelPageTitleLeft">
              <i class="fa-solid fa-hashtag"></i>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <div className="ChannelPageTitleRight">
              <div className="AddMembersButton">
                {addChannelMembersButton && (
                  <i
                    class="fa-solid fa-user-plus"
                    onClick={showAddMembersSearchBar}
                    title="Add a member"
                  ></i>
                )}
              </div>
              <div
                className="ShowMembersButton"
                onClick={ShowChannelMembers}
                title="View all members"
              >
                <p>
                  <i class="fa-solid fa-user"></i>
                  {totalMembers}
                </p>
              </div>
              <div>
                {user_id === channel?.owner_id && (
                  <i
                    class="fa-solid fa-ellipsis-vertical"
                    id="EditChannelButton"
                    onClick={showEditChannelForm}
                    title="Edit channel"
                  ></i>
                )}
              </div>
            </div>
          </div>
          <div className="MessagesBody">
            {messages
              ?.slice(0)
              .reverse()
              .map((message) => (
                <div
                  className="SingleMessageBody"
                  key={message.id}
                  // onMouseEnter={() => setShowEditMessage(true)}
                  // onMouseLeave={() => setShowEditMessage(false)}
                >
                  {message.image_url ? (
                    <div className="MessageProfile">
                      <img
                        src={message.image_url}
                        alt=""
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "5px",
                        }}
                      />
                    </div>
                  ) : (
                    <div className="MessageProfile">
                      <i class="fa-solid fa-square-person-confined"></i>
                    </div>
                  )}
                  <div className="MessageMain">
                    <div className="MessageInfo">
                      <div className="MessageName">{message.name}</div>
                      <div
                        className="MessageTime"
                        title={formatDate(message.time_created)}
                      >
                        {formatTime(message.time_created)}{" "}
                      </div>
                    </div>
                    <div className="MessageContent">{message.content}</div>
                  </div>
                  <div id={"MessageEdit" + message.id}>
                    {user_id === message.user_id && (
                      <>
                        <i
                          class="fa-solid fa-ellipsis-vertical"
                          title="Edit message"
                          id="EditMessageButton"
                          onClick={() => {
                            dispatch(
                              setCurrentEditModal(
                                EditMessageForm,
                                channel?.id,
                                message?.id
                              )
                            );
                            dispatch(showModal());
                          }}
                        ></i>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <CreateMessageForm channelId={channelId} />
        </div>
      )}
    </>
  );
};

export default ChannelPage;
