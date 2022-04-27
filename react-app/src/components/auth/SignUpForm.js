import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

import logo from "../../images/slack-ish.png";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [image_url, setImageUrl] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const validationErrors = [];

    if (first_name.length === 0)
      validationErrors.push("Please provide your first name");
    if (last_name.length === 0)
      validationErrors.push("Please provide your last name");
    if (!email.includes(".") || !email.includes("@") || email.length < 4)
      validationErrors.push("Please provide a valid email address");
    if (password.length < 5)
      validationErrors.push("Please provide a longer password");
    if (password !== repeatPassword)
      validationErrors.push("Password and Confirm Password fields must match");

    setErrors(validationErrors);
  }, [first_name, last_name, email, password, repeatPassword]);

  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      await dispatch(
        signUp(first_name, last_name, email.toLowerCase(), password, image_url)
      );

      setErrors([]);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      setImageUrl("");
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="SignupFormContainer">
      <div className="LoginFormHeader">
        <div className="LoginFormHeader-center">
          <img src={logo} alt="Slack-ish logo"></img>
        </div>
        <div className="LoginFormHeader-right">
          <p>Already have an account? </p>
          <a href="/login">Log in here</a>
        </div>
      </div>
      <div className="SignupFormArea">
        <h1>Sign up for Slack-ish</h1>
        <p>
          We suggest using an <strong>email address that doesn't work.</strong>
        </p>
        <form onSubmit={onSignUp}>
          <div className="SignFormErrors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              onChange={updateFirstName}
              value={first_name}
              required={true}
            ></input>
          </div>
          <div>
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              onChange={updateLastName}
              value={last_name}
              required={true}
            ></input>
          </div>
          <div>
            <input
              type="text"
              name="email"
              placeholder="name@throwaway-email.com"
              onChange={updateEmail}
              value={email}
              required={true}
            ></input>
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={updatePassword}
              value={password}
              required={true}
            ></input>
          </div>
          <div>
            <input
              type="password"
              name="repeat_password"
              placeholder="confirm password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div>
            <input
              type="url"
              name="image_url"
              placeholder="profile image url (optional)"
              onChange={updateImageUrl}
              value={image_url}
            ></input>
          </div>
          <button type="submit" disabled={errors.length > 0}>
            Sign Up
          </button>
        </form>
        <div className="SignUpFormAreaBottom">
          <input type="checkbox" name="signup-checkbox"></input>
          <label for="signup-checkbox" className="checkbox-text">
            It's okay to send me emails about Slack-ish.
          </label>
          <p>
            By continuing, you're agreeing to our Fake Policies and Cookie
            Policies that don't exist because we are not actually Slack.
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

export default SignUpForm;
