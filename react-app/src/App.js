import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBars/NavBar";
import SideBar from "./components/NavBars/SideBar/SideBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import Channels from "./components/Channels";
import ChannelPage from "./components/ChannelPage";
import CreateChannelForm from "./components/CreateChannelForm";
import Search from "./components/Search";
import CreateDMForm from "./components/CreateDMForm";

import Modal from "./components/Modal/Modal";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      {/* <SideBar /> */}
      <Modal />
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/search" exact={true}>
          {/* <h1>testing</h1> */}
          <Search />
        </ProtectedRoute>
        <Route path="/chatroom" exact={true}>
          {/* <ChatRoom /> */}
          <CreateChannelForm />
        </Route>
        {/* <Route path="/channels" exact={true}>
          <Channels />
        </Route> */}
        <Route path="/createDM" exact={true}>
          <CreateDMForm />
        </Route>
        <Route path="/channels/:channel_id" exact={true}>
          <ChannelPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
