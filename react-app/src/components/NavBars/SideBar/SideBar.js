import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Channels from "../../Channels";
import DirectMessages from "../../DirectMessages/DirectMessages";
import "./SideBar.css";

import Search from "../../Search";
import CreateChannelForm from "../../CreateChannelForm";
import { showModal, setCurrentModal } from "../../../store/modal";
import { showSearchModal, setCurrentSearchModal } from "../../../store/modal";

const Sidebar = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const [showAddChannel, setShowAddChannel] = useState(false);
  const [showAddDm, setShowAddDm] = useState(false);

  const showCreateChannelForm = () => {
    dispatch(setCurrentModal(CreateChannelForm));
    dispatch(showModal());
  };

  const showCreateDMSearch = () => {
    dispatch(setCurrentSearchModal(Search));
    dispatch(showSearchModal());
  };

  let sessionElements;
  if (sessionUser) {
    sessionElements = (
      <>
        <div className="SidebarNav">
          <div className="SidebarLabels">
            <div className="SidebarLogo">
              <h1>Slack-ish</h1>
              <i
                className="fa-regular fa-pen-to-square"
                onClick={showCreateDMSearch}
                title="New Direct Message"
              ></i>
            </div>
            <div
              className="SidebarLabel"
              onMouseEnter={() => setShowAddChannel(true)}
              onMouseLeave={() => setShowAddChannel(false)}
            >
              <i className="fa-solid fa-caret-down"></i>
              <h1>Channels</h1>
              <div
                className="addchannelbutton"
                onClick={showCreateChannelForm}
                title="Create Channel"
              >
                {showAddChannel && <i className="fa-solid fa-plus"></i>}
              </div>
            </div>
            <div className="SidebarLinks">
              <Channels />
              <div className="AddTeammates" onClick={showCreateChannelForm}>
                <i className="fa-solid fa-plus"></i>
                Add Channels
              </div>
            </div>
            <div
              className="SidebarLabel"
              id="SidebarLabelDms"
              onMouseEnter={() => setShowAddDm(true)}
              onMouseLeave={() => setShowAddDm(false)}
            >
              <i className="fa-solid fa-caret-down"></i>
              <h1>Direct Messages</h1>
              <div
                className="adddmbutton"
                onClick={showCreateDMSearch}
                title="Open a direct message"
              >
                {showAddDm && <i className="fa-solid fa-plus"></i>}
              </div>
            </div>
            <div className="SidebarLinks">
              <DirectMessages />
              <div className="AddTeammates" onClick={showCreateDMSearch}>
                <i className="fa-solid fa-plus"></i>
                Add Teammates
              </div>
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
