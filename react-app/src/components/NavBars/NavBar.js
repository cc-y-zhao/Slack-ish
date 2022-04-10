import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

import Search from "../Search";
import { showSearchModal, setCurrentSearchModal } from "../../store/modal";

import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showAddDm, setShowAddDm] = useState(false);

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
        {/* Add search bar here */}
        <div className="SearchButton" onClick={showCreateDMSearch}>
          Search users in Slack-ish
        </div>
        <div className="ProfileButton">
          {/* <i
            class="fa-solid fa-square-person-confined"
            id="ProfileField"
            onClick={openMenu}
          ></i> */}
          {sessionUser.image_url ? (
            <img
              src={sessionUser.image_url}
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

{
  /* <ul>
<li>
  <NavLink to="/" exact={true} activeClassName="active">
    Home
  </NavLink>
</li>
<li>
  <NavLink to="/login" exact={true} activeClassName="active">
    Login
  </NavLink>
</li>
<li>
  <NavLink to="/sign-up" exact={true} activeClassName="active">
    Sign Up
  </NavLink>
</li>
<li>
  <NavLink to="/users" exact={true} activeClassName="active">
    Users
  </NavLink>
</li>
<li>
  <LogoutButton />
</li>
</ul> */
}
