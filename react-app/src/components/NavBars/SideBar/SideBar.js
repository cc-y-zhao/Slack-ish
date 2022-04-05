import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  /* background: #15171c;
  height: 80px; */
`;

const Sidebar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionElements;
  if (sessionUser) {
    sessionElements = (
      <>
        <Nav>Nav</Nav>
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
