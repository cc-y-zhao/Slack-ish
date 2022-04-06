import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Channels from "../../Channels";
import DirectMessages from "../../DirectMessages/DirectMessages";
import "./SideBar.css";

const Sidebar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [showAddChannel, setShowAddChannel] = useState(false);
  const [showAddDm, setShowAddDm] = useState(false);

  let sessionElements;
  if (sessionUser) {
    sessionElements = (
      <>
        <div className="SidebarNav">
          <div className="SidebarLabels">
            <div className="SidebarLogo">
              <h1>Slack-ish</h1>
            </div>
            <div
              className="SidebarLabel"
              onMouseEnter={() => setShowAddChannel(true)}
              onMouseLeave={() => setShowAddChannel(false)}
            >
              <i className="fa-solid fa-caret-down"></i>
              <h1>Channels</h1>
              <div className="addchannelbutton">
                {showAddChannel && <i className="fa-solid fa-plus"></i>}
              </div>
            </div>
            <div className="SidebarLinks">
              <Channels />
            </div>
            <div
              className="SidebarLabel"
              onMouseEnter={() => setShowAddDm(true)}
              onMouseLeave={() => setShowAddDm(false)}
            >
              <i className="fa-solid fa-caret-down"></i>
              <h1>Direct Messages</h1>
              <div className="adddmbutton">
                {showAddDm && <i className="fa-solid fa-plus"></i>}
              </div>
            </div>
            <div className="SidebarLinks">
              <DirectMessages />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    sessionElements = <></>;
  }
  return (
    <>
      <nav>{sessionElements}</nav>
    </>
  );
};

export default Sidebar;
