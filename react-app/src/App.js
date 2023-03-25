import React, { useState, useEffect } from "react";
import { BrowserRouter, HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBars/NavBar";
import SideBar from "./components/NavBars/SideBar/SideBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import ChannelPage from "./components/ChannelPage";
import Search from "./components/Search";
import DontBelongHerePage from "./components/DontBelongHerePage/DontBelongHerePage";

import Modal from "./components/Modal/Modal";
import SearchModal from "./components/Modal/SearchModal";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

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
    {/* <HashRouter> */}
      <NavBar />
      <SideBar />
      <Modal />
      <SearchModal />
      <Switch>
        <Route path="/" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/search" exact={true}>
          <Search />
        </ProtectedRoute>
        <ProtectedRoute path="/channels/:channel_id" exact={true}>
          <ChannelPage />
        </ProtectedRoute>
        <Route path="*">
          {sessionUser ? <DontBelongHerePage /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    {/* </HashRouter> */}
    </BrowserRouter>
  );
}

export default App;
