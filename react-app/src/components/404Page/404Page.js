import React from "react";
import { useHistory } from "react-router-dom";

export const NoPage = () => {
  const history = useHistory();
  return (
    <div style={{ marginLeft: "10px" }}>
      <h2>We can't access this page!</h2>
      <p>
        Try to go to the{" "}
        <span style={{ color: "pink" }} onClick={() => history.push("/")}>
          Login Page
        </span>
      </p>
    </div>
  );
};
