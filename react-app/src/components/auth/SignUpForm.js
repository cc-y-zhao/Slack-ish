import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
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
        signUp(first_name, last_name, email, password)
      );

      setErrors([]);
      setFirstName("");
      setLastName("");
      // setUsername("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");

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

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="first_name"
          onChange={updateFirstName}
          value={first_name}
          required={true}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="last_name"
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
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type="submit" disabled={errors.length > 0}>
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
