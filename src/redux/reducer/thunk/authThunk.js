import { createAsyncThunk } from "@reduxjs/toolkit";

const KEY = process.env.REACT_APP_KEY;
const LOGIN_PATH = process.env.REACT_APP_LOGIN + KEY;
const SIGNUP_PATH = process.env.REACT_APP_SIGNUP + KEY;

export const firebaseLogin = createAsyncThunk("fetch/login", async (data) => {
  const response = await fetch(LOGIN_PATH, {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    }),
    header: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return result;
});

export const firebaseSignup = createAsyncThunk("fetch/signup", async (data) => {
  const response = await fetch(SIGNUP_PATH, {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      displayName: data.name + " " + data.lastname,
      returnSecureToken: true,
    }),
    header: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return result;
});
