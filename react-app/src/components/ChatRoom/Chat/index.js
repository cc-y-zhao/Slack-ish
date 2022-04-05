import React from "react";
import "./Chat.css";

const Chat = () => {
  return (
    <div className="chat">
      {/* <ChatHeader /> */}

      <div className="chat__messages">{/* <Message /> */}</div>

      <div className="chat__input">
        <form>
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
          <input placeholder="Send message" />
          <div className="chat_iconsBottom">
            <i class="fa-solid fa-circle-plus"></i>
            <i class="fa-solid fa-video"></i>
            <i class="fa-solid fa-microphone-lines"></i>
            <i class="fa-solid fa-face-smile"></i>
            <i class="fa-solid fa-at"></i>
            {/* <i class="fa-solid fa-paper-plane-top"></i> */}
          </div>

          <div className="chat__sendMessage">
            <i class="fa-solid fa-paper-plane"></i>
          </div>
        </form>

        <div className="chat_submitIcon">
          <button className="chat__submitButton" type="submit"></button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
