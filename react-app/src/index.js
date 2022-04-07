import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";

import { setModalMount } from "./store/modal";
import { setSearchModalMount } from "./store/modal";

const store = configureStore();

const Root = () => {
  const dispatch = useDispatch();
  const modalMountRef = useRef(null);
  const searchModalMountRef = useRef(null);

  useEffect(() => {
    dispatch(setModalMount(modalMountRef.current));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchModalMount(searchModalMountRef.current));
  }, [dispatch]);

  return (
    <>
      <App />
      <div ref={modalMountRef} className="modal"></div>
      <div ref={searchModalMountRef} className="modal"></div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
