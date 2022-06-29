import { createSlice } from "@reduxjs/toolkit";
import {
  firebaseLoginAction,
  firebaseSignupAction,
} from "./actions/authAction";

const isLoged = () => {
  return !!localStorage.getItem("idToken");
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: isLoged(),
    status: {
      login: undefined,
      signup: undefined,
    },
    message: {
      login: undefined,
      signup: undefined,
    },
  },
  reducers: {
    Logout(state) {
      localStorage.removeItem("idToken");
      localStorage.removeItem("user");
      localStorage.removeItem("localId");

      state.authenticated = false;
    },
    resetErros(state) {
      state.status.login = undefined;
      state.message.login = undefined;

      state.status.signup = undefined;
      state.message.signup = undefined;
    },
  },
  extraReducers: (builder) => {
    firebaseLoginAction(builder);
    firebaseSignupAction(builder);
  },
});

export const { Logout, resetErros } = AuthSlice.actions;

export default AuthSlice.reducer;
