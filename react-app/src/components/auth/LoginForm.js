import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

import logo from "../../images/slack-ish.png";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="LoginFormContainer">
      <div className="LoginFormHeader">
        <div className="LoginFormHeader-center">
          <img src={logo} alt="Slack-ish logo"></img>
        </div>
        <div className="LoginFormHeader-right">
          <p>New to Slack-ish? </p>
          <a href="/sign-up">Create an account</a>
        </div>
      </div>
      <div className="LoginFormArea">
        <h1>Sign in to Slack-ish</h1>
        <p>
          We suggest using the <strong>email address you use at work.</strong>
        </p>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            {/* <label htmlFor="email">Email</label> */}
            <input
              name="email"
              type="text"
              placeholder="name@work-email.com"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            {/* <label htmlFor="password">Password</label> */}
            <input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
