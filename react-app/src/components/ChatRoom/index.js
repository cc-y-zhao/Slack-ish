import React from "react";
import Home from "./Home";
import SearchBar from "../SearchBar";
import SideBar from "./SideBar";
import "./ChatRoom.css";

const ChatRoom = () => {
  return (
    <div className="chatroom">
      <SearchBar />
      <SideBar />
      <Home />
    </div>
  );
};

export default ChatRoom;
