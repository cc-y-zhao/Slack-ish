import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";

import logo from "../../images/slack-ish.png";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  if (user) history.push("/channels/1");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
      return;
    }

    history.push("/channels/1");
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // if (user) {
  //   return <Redirect to="/" />;
  // }

  const demoLogin = async () => {
    await dispatch(login("demo@aa.io", "password"));
    history.push("/channels/1");
  };

  return (
    <div className="SignupFormContainer">
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
          We suggest using an <strong>email address that doesn't work.</strong>
        </p>
        <form onSubmit={onLogin}>
          <div className="SignFormErrors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            {/* <label htmlFor="email">Email</label> */}
            <input
              name="email"
              type="text"
              placeholder="name@throwaway-email.com"
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
          <button type="submit">Sign In with Email</button>
        </form>
        <div className="demo-login">
          <i class="fa-regular fa-heart"></i>
          <p className="Box">
            We won't email you a magic code for a password-free sign in. Or you
            can <a onClick={demoLogin}>sign in as a demo user instead</a>.
          </p>
        </div>
      </div>
      {/* <button onClick={demo}>demo</button> */}
      <div className="LoginFormFooter">
        <a href="https://github.com/cc-y-zhao/Slack-ish">Slack-ish Github</a>
        <div className="contact-dropup">
          <a>Contact Us</a>
          <div className="contact-dropup-content">
            <a href="https://www.linkedin.com/in/ceciliazh/">Cecilia Zhao</a>
            <a href="https://www.linkedin.com/in/gabriel-sitorus/">
              Gabriel Sitorus
            </a>
            <a href="https://www.linkedin.com/in/sharonfang8/">Sharon Fang</a>
          </div>
        </div>
        <a>
          <i class="fa-solid fa-globe"></i> Languages used{" "}
          <i class="fa-solid fa-angle-down"></i>
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
