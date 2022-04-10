import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import EditChannelForm from "../EditChannelForm";
import CreateMessageForm from "../CreateMessageForm";
import EditMessageForm from "../EditMessageForm";

import ChannelMembers from "../ChannelMembers";
import { loadChannel, deleteMessage } from "../../store/channels";

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
  const history = useHistory();
  const { channel_id } = useParams();
  const channelId = parseInt(channel_id);
  const channel = useSelector((state) => state.channels[channel_id]);
  const user_id = useSelector((state) => state.session.user?.id);
  const members = channel?.users_in_channel;
  const totalMembers = `(${members?.length})`;


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
  if (channel?.is_dm == false) {
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
    return <Redirect to='/login' />
  }

  let showChannel = false;

  if (channel) {
    let ids = channel['users_ids'];
    console.log('ids-----------------------', ids);
    console.log('userId-----------------------', user_id);
    console.log('BOOLEAN-----------------------', ids?.includes(user_id));
    if (ids?.includes(user_id)) {
      showChannel = true;
    } else {
      return <Redirect to='/channels/1' />
    }
  }

  return (
    <>
      { showChannel ? (
        <div className="ChannelPageBody">
        <div className="ChannelPageTitle">
          <div className="ChannelPageTitleLeft">
            <i class="fa-solid fa-hashtag"></i>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="ChannelPageTitleRight">
            <div>
              {addChannelMembersButton && (
                <button onClick={showAddMembersSearchBar}>Add Members</button>
              )}
            </div>
            <div>
              <button onClick={ShowChannelMembers}>
                Channel Members {totalMembers}
              </button>
            </div>
            {user_id == channel?.owner_id && (
              <i
                class="fa-solid fa-ellipsis-vertical"
                id="EditChannelButton"
                onClick={showEditChannelForm}
              ></i>
            )}
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
                      style={{ width: "45px", height: "43px", paddingTop: "7px" }}
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
                    <div className="MessageTime">
                      {formatTime(message.time_created)}{" "}
                    </div>
                    <div className="MessageTime">
                      {formatDate(message.time_created)}
                    </div>
                  </div>
                  <div className="MessageContent">{message.content}</div>
                </div>
                <div id={"MessageEdit" + message.id}>
                  {user_id === message.user_id && (
                    <>
                      <i
                        class="fa-solid fa-ellipsis-vertical"
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
      ) : (
        <>
          <h1>YOU DONT BELONG HERE</h1>
        </>
      )
      }
    </>
  );
};

export default ChannelPage;
