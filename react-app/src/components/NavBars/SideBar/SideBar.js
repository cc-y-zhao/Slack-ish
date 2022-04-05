import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Channels from "../../Channels";
import "./SideBar.css";

const Sidebar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionElements;
  if (sessionUser) {
    sessionElements = (
      <>
        <div className="SidebarNav">
          <div className="SidebarLabels">
            <div className="SidebarLabel">
              <h1>Channels</h1>
            </div>
            <div className="SidebarLinks">
              <Channels />
            </div>
            <div className="SidebarLabel">
              <h1>Direct Messages</h1>
            </div>
            <div className="SidebarLinks"></div>
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
