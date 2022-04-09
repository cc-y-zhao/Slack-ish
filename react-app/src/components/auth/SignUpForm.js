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
  // const [username, setUsername] = useState("");
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
    // if (username.length < 4)
    //   validationErrors.push("Usernames must be at least 4 characters");
    // if (username.length > 25)
    //   validationErrors.push("Usernames must be less than 25 characters");
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
      const data = await dispatch(
        signUp(first_name, last_name, email.toLowerCase(), password, image_url)
      );

      setErrors([]);
      setFirstName("");
      setLastName("");
      // setUsername("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      setImageUrl("");

      // if (data) {
      //   setErrors(data);
      // }
    }
  };

  // const onSignUp = async (e) => {
  //   e.preventDefault();

  //   if (password === repeatPassword) {
  //     const data = await dispatch(signUp(username, first_name, last_name, email, password));
  //     if (data) {
  //       setErrors(data)
  //     }
  //   }
  // };

  // const updateUsername = (e) => {
  //   setUsername(e.target.value);
  // };

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
          {/* <div>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
          required={true}
        ></input>
      </div> */}
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

export default SignUpForm;
