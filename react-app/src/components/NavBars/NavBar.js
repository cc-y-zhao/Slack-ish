import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCurrentModal, showModal } from "../../store/modal";
import LogoutButton from "../auth/LogoutButton";
import Search from "../Search";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const showSearchForm = () => {
    dispatch(setCurrentModal(Search));
    dispatch(showModal());
  }
  let sessionElements;
  if (sessionUser) {
    sessionElements = (
      <>
        <div className="Nav">
          <h1>Top Nav Bar</h1>
          {/* <Search /> */}
          <input className="searchbar__mainPage"
          placeholder="Search Slack-ish users"
          onClick={showSearchForm}
          ></input>
          <LogoutButton />
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
