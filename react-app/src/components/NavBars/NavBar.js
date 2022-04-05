import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionElements;
  if (sessionUser) {
    sessionElements = (
      <>
        <div className="Nav">
          <h1>Top Nav Bar</h1>
        </div>
        {/* Add search bar here */}
        <LogoutButton />
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
