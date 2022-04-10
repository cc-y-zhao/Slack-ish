import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Redirect, useHistory } from "react-router-dom";

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
    return <Redirect to='/login' />
  };

  return (
    <div onClick={onLogout} className="ProfileLogout">
      Sign out of Slack-ish
    </div>
  );
};

export default LogoutButton;
