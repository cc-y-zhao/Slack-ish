import React from "react";
import "./Chat.css";
import CreateMessageForm from "../../CreateMessageForm";
import ChannelPage from "../../ChannelPage";

const Chat = () => {
  return (
    <div className="chat">
      {/* <ChatHeader /> */}

      <div className="chat__messages">
        <ChannelPage />
      </div>

      <div className="chat__input">
        <div className="chat_iconsTop">
          <i class="fa-solid fa-bold"></i>
          <i class="fa-solid fa-italic"></i>
          <i class="fa-solid fa-strikethrough"></i>
          <i class="fa-solid fa-link"></i>
          <i class="fa-solid fa-list"></i>
          <i class="fa-solid fa-list-ol"></i>
          <i class="fa-solid fa-bars"></i>
          <i class="fa-solid fa-code"></i>
          <i class="fa-solid fa-laptop-code"></i>
        </div>
        {/* <form>
          <textarea placeholder="Send message" />
        </form> */}
        <CreateMessageForm />
        {/* <div className="chat__sendMessage">
          <i class="fa-solid fa-paper-plane"></i>
        </div> */}
        {/* <div className="chat_submitIcon">
            <button className="chat__submitButton" type="submit"></button>
          </div> */}
        <div className="chat_iconsBottom">
          <i class="fa-solid fa-circle-plus"></i>
          <i class="fa-solid fa-video"></i>
          <i class="fa-solid fa-microphone-lines"></i>
          <i class="fa-solid fa-face-smile"></i>
          <i class="fa-solid fa-at"></i>
          {/* <i class="fa-solid fa-paper-plane-top"></i> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
