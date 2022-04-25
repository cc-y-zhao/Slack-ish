import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
            <input
              name="email"
              type="text"
              placeholder="name@throwaway-email.com"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
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
          <i className="fa-regular fa-heart"></i>
          <p className="Box">
            We won't email you a magic code for a password-free sign in. Or you
            can <a onClick={demoLogin}>sign in as a demo user instead</a>.
          </p>
        </div>
      </div>
      <div className="LoginFormFooter">
        <a href="https://github.com/cc-y-zhao/Slack-ish">Slack-ish Github</a>
        <div className="contact-dropup">
          <p>Contact Us</p>
          <div className="contact-dropup-content">
            <a href="https://www.linkedin.com/in/ceciliazh/">Cecilia Zhao</a>
            <a href="https://www.linkedin.com/in/sharonfang8/">Sharon Fang</a>
          </div>
        </div>
        <div className="languages-dropup">
          <p>
            <i className="fa-solid fa-globe"></i> Languages used{" "}
            <i className="fa-solid fa-angle-down"></i>
          </p>
          <div className="languages-dropup-content">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg"
              alt="python"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg"
              alt="sqlalchemy"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg"
              alt="postgresql"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
              alt="javascript"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg"
              alt="react"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
              alt="redux"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg"
              alt="html5"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg"
              alt="css3"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
              alt="git"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
