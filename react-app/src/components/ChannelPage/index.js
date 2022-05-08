import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import EditChannelForm from "../EditChannelForm";
import CreateMessageForm from "../CreateMessageForm";
import EditMessageForm from "../EditMessageForm";

import ChannelMembers from "../ChannelMembers";
import { loadChannel, createMessage } from "../../store/channels";

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
import icon from "../../images/icon.png";

// import the socket
import { io } from "socket.io-client";

// outside of your component, initialize the socket variable
let socket;

const ChannelPage = () => {
  const { channel_id } = useParams();
  const channelId = parseInt(channel_id);
  const [socketMessages, setSocketMessages] = useState([]);
  const [socketRoom, setSocketRoom] = useState();
  const [chatInput, setChatInput] = useState("");
  const [prevRoom, setPrevRoom] = useState(
    channelId && `channel${channelId}`
  );
  const dispatch = useDispatch();
  const channel = useSelector((state) => state.channels[channel_id]);
  const user_id = useSelector((state) => state.session.user?.id);
  const user = useSelector((state) => state.session.user);
  const members = channel?.users_in_channel;
  const totalMembers = `(${members?.length})`;

  // if (channel?.messages) {
  //   // setSocketMessages(channel?.messages);
  //   // setSocketMessages(Object.values(channel?.messages));
  //   // messages = Object.values(channel?.messages);
  //   Object.values(channel.messages).map((message) => {
  //     socketMessages.push({ createdMessage: message });
  //   });
  // }

  useEffect(() => {
    if (channelId) {
      dispatch(loadChannel(channelId));
      setSocketRoom(`channel${channelId}`);
    }
  }, [dispatch, channelId]);

  useEffect(() => {

    if (channel && channel.messages) {
      setSocketMessages(Object.values(channel?.messages));
    }

  }, [channel]);

  // console.log("socket messages ---------------", typeof socketMessages);
  // console.log("this is an array--------------", typeof []);
  console.log("socket messages before socket use effect---------------", socketMessages);

  useEffect(() => {
    // create websocket
    socket = io();

    console.log("im in socket.on useeffect-----------------")
    console.log("socket messages before socket.on!!!!!!--------------", socketMessages)


    // listen for chat events
    socket.on("message", (message) => {
      console.log("im in socket.on-----------------")
      console.log("new message in socket.on-----------------", message);
      console.log("socket messages before--------------", socketMessages)
      // when we recieve a message, add it into our messages array in state
      // let previousMessages = Object.values(socketMessages);
      // console.log("previous messages------------", previousMessages);
      setSocketMessages((socketMessages) => [...socketMessages, message]);
      // setSocketMessages(['this is empty'])
      console.log("socket messages after--------------", socketMessages);

    });

    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    leaveRoom(prevRoom);
    joinRoom(socketRoom);
    setPrevRoom(socketRoom);
  }, [prevRoom, socketRoom]);

  const leaveRoom = (oldRoom) => {
    socket.emit("leave_room", { room: oldRoom });
  };

  const joinRoom = (newRoom) => {
    socket.emit("join_room", { room: newRoom });
  };


  const sendChat = async (e) => {
    e.preventDefault();
    // emit a message
    let name = user.first_name + " " + user.last_name;
    let newMessage = {
      user_id,
      channel_id,
      content: chatInput,
    };
    let createdMessage = await dispatch(createMessage(channel_id, newMessage));
    // .then((newMessage) =>
    //   socket.emit("chat", { newMessage })
    // );
    createdMessage['room'] = socketRoom;
    // createdMessage['user'] = {"first_name": user.first_name, "last_name": user.last_name, "image_url": user.image_url}
    createdMessage['name'] = createdMessage?.user?.first_name + " " + createdMessage?.user?.last_name;
    createdMessage['image_url'] = createdMessage?.user?.image_url;
    // createdMessage['time_created'] = createdMessage?.time_created;


    console.log("created message------------", createdMessage);

    // console.log("createdMessage in ChannelPAge--------------", createdMessage)
    socket.send(createdMessage);
    // socket.send("chat", { createdMessage });
    // await dispatch(createMessage(channel_id, newMessage)).then(() =>
    //   socket.emit("chat", { user: name, msg: chatInput })
    // );
    // socket.emit("message", { createdMessage });
    // clear the input field after the message is sent
    setChatInput("");
  };

  const showEditChannelForm = () => {
    dispatch(setCurrentEditModal(EditChannelForm, channel?.id));
    dispatch(showModal());
  };

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

  if (channel && channel["users_ids"]) {
    if (channel["users_ids"]?.includes(user_id)) showChannel = true;
  } else {
    return <Redirect to="/channels/1" />;
  }

  return (
    <>
      {showChannel && (
        <div className="ChannelPageBody">
          <div className="ChannelPageTitle">
            <div className="ChannelPageTitleLeft">
              <i className="fa-solid fa-hashtag"></i>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <div className="ChannelPageTitleRight">
              <div className="AddMembersButton">
                {addChannelMembersButton && (
                  <i
                    className="fa-solid fa-user-plus"
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
                  <i className="fa-solid fa-user"></i>
                  {totalMembers}
                </p>
              </div>
              <div>
                {user_id === channel?.owner_id && (
                  <i
                    className="fa-solid fa-ellipsis-vertical"
                    id="EditChannelButton"
                    onClick={showEditChannelForm}
                    title="Edit channel"
                  ></i>
                )}
              </div>
            </div>
          </div>
          <div className="MessagesBody">
            {/* {channel?.messages &&
              Object.values(channel?.messages)
                ?.slice(0)
                .reverse()
                .map((message) => (
                  <div
                    className="SingleMessageBody"
                    key={message.id}
                    // onMouseEnter={() => setShowEditMessage(true)}
                    // onMouseLeave={() => setShowEditMessage(false)}
                  >
                    {message?.image_url ? (
                      <div className="MessageProfile">
                        <img
                          src={message.image_url}
                          onError={(e) => {
                            e.target.setAttribute("src", icon);
                          }}
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
                        <i className="fa-solid fa-square-person-confined"></i>
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
                            className="fa-solid fa-ellipsis-vertical"
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
                ))} */}
{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                 */}
{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                 */}
{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                 */}
            {socketMessages
              ?.slice(0)
              .reverse()
              .map((message) => (
                <div
                  className="SingleMessageBody"
                  key={"" + message?.id}
                  // onMouseEnter={() => setShowEditMessage(true)}
                  // onMouseLeave={() => setShowEditMessage(false)}
                >
                  {message?.user?.image_url ? (
                    <div className="MessageProfile">
                      <img
                        src={message?.user?.image_url}
                        onError={(e) => {
                          e.target.setAttribute("src", icon);
                        }}
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
                      <i className="fa-solid fa-square-person-confined"></i>
                    </div>
                  )}
                  <div className="MessageMain">
                    <div className="MessageInfo">
                      <div className="MessageName">
                        {message?.user?.first_name}{" "}
                        {message?.user?.last_name}
                      </div>
                      <div
                        className="MessageTime"
                        title={formatDate(message?.time_created)}
                      >
                        {formatTime(message?.time_created)}{" "}
                      </div>
                    </div>
                    <div className="MessageContent">
                      {message?.content}
                    </div>
                  </div>
                  <div id={"MessageEdit" + message?.id}>
                    {user_id === message?.user_id && (
                      <>
                        <i
                          className="fa-solid fa-ellipsis-vertical"
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
          <CreateMessageForm
            channelId={channelId}
            chatInput={chatInput}
            setChatInput={setChatInput}
            sendChat={sendChat}
          />
        </div>
      )}
    </>
  );

  // return (
  //   <>
  //     {showChannel && (
  //       <div className="ChannelPageBody">
  //         <div className="ChannelPageTitle">
  //           <div className="ChannelPageTitleLeft">
  //             <i className="fa-solid fa-hashtag"></i>
  //             <h2>{title}</h2>
  //             <p>{description}</p>
  //           </div>
  //           <div className="ChannelPageTitleRight">
  //             <div className="AddMembersButton">
  //               {addChannelMembersButton && (
  //                 <i
  //                   className="fa-solid fa-user-plus"
  //                   onClick={showAddMembersSearchBar}
  //                   title="Add a member"
  //                 ></i>
  //               )}
  //             </div>
  //             <div
  //               className="ShowMembersButton"
  //               onClick={ShowChannelMembers}
  //               title="View all members"
  //             >
  //               <p>
  //                 <i className="fa-solid fa-user"></i>
  //                 {totalMembers}
  //               </p>
  //             </div>
  //             <div>
  //               {user_id === channel?.owner_id && (
  //                 <i
  //                   className="fa-solid fa-ellipsis-vertical"
  //                   id="EditChannelButton"
  //                   onClick={showEditChannelForm}
  //                   title="Edit channel"
  //                 ></i>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //         <div className="MessagesBody">
  //           {messages
  //             ?.slice(0)
  //             .reverse()
  //             .map((message) => (
  //               <div
  //                 className="SingleMessageBody"
  //                 key={message.id}
  //                 // onMouseEnter={() => setShowEditMessage(true)}
  //                 // onMouseLeave={() => setShowEditMessage(false)}
  //               >
  //                 {message?.image_url ? (
  //                   <div className="MessageProfile">
  //                     <img
  //                       src={message.image_url}
  //                       onError={(e) => {
  //                         e.target.setAttribute("src", icon);
  //                       }}
  //                       alt=""
  //                       style={{
  //                         width: "45px",
  //                         height: "45px",
  //                         borderRadius: "5px",
  //                       }}
  //                     />
  //                   </div>
  //                 ) : (
  //                   <div className="MessageProfile">
  //                     <i className="fa-solid fa-square-person-confined"></i>
  //                   </div>
  //                 )}
  //                 <div className="MessageMain">
  //                   <div className="MessageInfo">
  //                     <div className="MessageName">{message.name}</div>
  //                     <div
  //                       className="MessageTime"
  //                       title={formatDate(message.time_created)}
  //                     >
  //                       {formatTime(message.time_created)}{" "}
  //                     </div>
  //                   </div>
  //                   <div className="MessageContent">{message.content}</div>
  //                 </div>
  //                 <div id={"MessageEdit" + message.id}>
  //                   {user_id === message.user_id && (
  //                     <>
  //                       <i
  //                         className="fa-solid fa-ellipsis-vertical"
  //                         title="Edit message"
  //                         id="EditMessageButton"
  //                         onClick={() => {
  //                           dispatch(
  //                             setCurrentEditModal(
  //                               EditMessageForm,
  //                               channel?.id,
  //                               message?.id
  //                             )
  //                           );
  //                           dispatch(showModal());
  //                         }}
  //                       ></i>
  //                     </>
  //                   )}
  //                 </div>
  //               </div>
  //             ))}
  //         </div>
  //         <CreateMessageForm channelId={channelId} chatInput={chatInput} setChatInput={setChatInput}/>
  //       </div>
  //     )}
  //   </>
  // );
};

export default ChannelPage;
