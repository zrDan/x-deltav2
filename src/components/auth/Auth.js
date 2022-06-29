import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetErros } from "../../redux/reducer/auth";
import {
  firebaseLogin,
  firebaseSignup,
} from "../../redux/reducer/thunk/authThunk";
import Error from "../UI/Error";
import styles from "./styles/Auth.module.css";

function Auth() {
  const dispatch = useDispatch();
  const [isName, setIsName] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isLogForm, setIsLogForm] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isLastname, setIsLastname] = useState(true);
  const errorLogin = useSelector((state) => state.auth.status.login);
  const errorSignup = useSelector((state) => state.auth.status.signup);
  const loginErrorMessage = useSelector((state) => state.auth.message.login);
  const signupErrorMessage = useSelector((state) => state.auth.message.signup);

  const nameInputRef = useRef();
  const lastnameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const formHandler = () => {
    setIsLogForm((prevState) => !prevState);
    setIsEmail(true);
    setIsPassword(true);
    setIsName(true);
    setIsLastname(true);
  };

  const inputValidator = (input, type) => {
    if (input.length < 1) {
      return false;
    }

    if (type === "password") {
      if (input.length < 8) {
        return false;
      }
    }

    if (type === "email") {
      if (!input.includes("@")) {
        return false;
      }
    }

    return true;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value.trim();
    const enteredPassword = passwordInputRef.current.value.trim();

    const emailIsValid = inputValidator(enteredEmail, "email");
    const passwordIsValid = inputValidator(enteredPassword, "password");

    setIsEmail(emailIsValid);
    setIsPassword(passwordIsValid);

    let formIsValid = emailIsValid && passwordIsValid;

    if (!isLogForm) {
      const enteredName = nameInputRef.current.value.trim();
      const enteredLastname = lastnameInputRef.current.value.trim();
      const nameIsValid = inputValidator(enteredName, "text");
      const lastnameIsValid = inputValidator(enteredLastname, "text");

      setIsName(nameIsValid);
      setIsLastname(lastnameIsValid);

      formIsValid = formIsValid && nameIsValid && lastnameIsValid;

      if (formIsValid) {
        dispatch(
          firebaseSignup({
            email: enteredEmail,
            password: enteredPassword,
            name: enteredName,
            lastname: enteredLastname,
          })
        );

        return;
      }

      return;
    }

    if (formIsValid) {
      dispatch(
        firebaseLogin({
          email: enteredEmail,
          password: enteredPassword,
        })
      );
    }
  };

  const closeModalHandler = () => {
    dispatch(resetErros());
  };

  return (
    <Fragment>
      {errorLogin === "error" && (
        <Error message={loginErrorMessage} onCloseModal={closeModalHandler} />
      )}
      {errorSignup === "error" && (
        <Error message={signupErrorMessage} onCloseModal={closeModalHandler} />
      )}
      <div className={styles.auth}>
        <h1>
          {isLogForm && "Login"}
          {!isLogForm && "Signup"}
        </h1>
        <form onSubmit={submitHandler}>
          {!isLogForm && (
            <Fragment>
              <div className={styles.formGroup}>
                <label
                  className={isName ? undefined : styles.invalidLabel}
                  htmlFor="firstname"
                >
                  First Name
                </label>
                <input
                  className={isName ? undefined : styles.invalidInput}
                  type="text"
                  id="firstname"
                  ref={nameInputRef}
                />
                <span>{!isName && "Enter a valid Name!"}</span>
              </div>
              <div className={styles.formGroup}>
                <label
                  className={isLastname ? undefined : styles.invalidLabel}
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <input
                  className={isLastname ? undefined : styles.invalidInput}
                  type="text"
                  id="lastname"
                  ref={lastnameInputRef}
                />
                <span>{!isLastname && "Enter a valid Last Name!"}</span>
              </div>
            </Fragment>
          )}
          <div className={styles.formGroup}>
            <label
              className={isEmail ? undefined : styles.invalidLabel}
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={isEmail ? undefined : styles.invalidInput}
              type="email"
              id="email"
              ref={emailInputRef}
            />
            <span>{!isEmail && "Enter a valid Email!"}</span>
          </div>
          <div className={styles.formGroup}>
            <label
              className={isPassword ? undefined : styles.invalidLabel}
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={isPassword ? undefined : styles.invalidInput}
              type="password"
              id="password"
              ref={passwordInputRef}
            />
            <span>
              {!isPassword && "Enter a valid Password, min 8 characters!"}
            </span>
          </div>
          <div className={styles.actions}>
            <button className={styles.success} type="submit">
              {isLogForm ? "Login" : "Signup"}
            </button>
            {!isLogForm && (
              <button
                className={styles.danger}
                type="button"
                onClick={formHandler}
              >
                Cancel
              </button>
            )}
            {isLogForm && <span onClick={formHandler}>Create an Account</span>}
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default Auth;
