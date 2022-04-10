import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogoutButton from "../auth/LogoutButton";

import Search from "../Search";
import { showSearchModal, setCurrentSearchModal } from "../../store/modal";

import "./NavBar.css";
import icon from "../../images/icon.png";

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const showCreateDMSearch = () => {
    dispatch(setCurrentSearchModal(Search));
    dispatch(showSearchModal());
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  let sessionElements;
  if (sessionUser) {
    sessionElements = (
      <div className="Nav">
        <div></div>
        <div className="SearchButton" onClick={showCreateDMSearch}>
          Search users in Slack-ish
        </div>
        <div className="ProfileButton">
          {sessionUser.image_url ? (
            <img
              src={sessionUser.image_url}
              onError={(e) => {
                e.target.setAttribute("src", icon);
              }}
              alt=""
              style={{
                width: "33px",
                height: "33px",
                borderRadius: "5px",
              }}
              id="ProfileField"
              onClick={openMenu}
            />
          ) : (
            <i
              class="fa-solid fa-square-person-confined"
              id="ProfileField"
              onClick={openMenu}
            ></i>
          )}
          {showMenu && (
            <>
              <div className="ProfileList">
                <div className="ProfileNameArea">
                  {sessionUser.image_url ? (
                    <img
                      src={sessionUser.image_url}
                      onError={(e) => {
                        e.target.setAttribute("src", icon);
                      }}
                      alt=""
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "5px",
                      }}
                    />
                  ) : (
                    <i class="fa-solid fa-square-person-confined"></i>
                  )}
                  <div className="ProfileName_Status">
                    <div className="ProfileName">
                      {sessionUser.first_name} {sessionUser.last_name}
                    </div>
                    <div className="ProfileStatus">
                      <i class="fa-solid fa-circle"></i>
                      <p>Active</p>
                    </div>
                  </div>
                </div>
                <LogoutButton />
              </div>
            </>
          )}
        </div>
      </div>
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

export default NavBar;
