import { firebaseLogin, firebaseSignup } from "../thunk/authThunk";

export const firebaseLoginAction = (builder) => {
  builder
    .addCase(firebaseLogin.pending, (state) => {
      state.status.login = "loading";
    })
    .addCase(firebaseLogin.fulfilled, (state, action) => {
      const data = action.payload;

      if (data.error) {
        let message = data.error.message;
        const attempsError =
          "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";

        if (message === attempsError) {
          message = "Too many attemps! Try later.";
        }

        state.message.login = message.replaceAll("_", " ");
        state.status.login = "error";

        return;
      }

      localStorage.setItem("idToken", data.idToken);
      localStorage.setItem("user", data.displayName);
      localStorage.setItem("localId", data.localId);

      state.authenticated = true;
      state.status.login = "success";
    })
    .addCase(firebaseLogin.rejected, (state, action) => {
      state.message.login = "Ups something went wrong!";
      state.status.login = "error";
    });
};

export const firebaseSignupAction = (builder) => {
  builder
    .addCase(firebaseSignup.pending, (state) => {
      state.status.signup = "loading";
    })
    .addCase(firebaseSignup.fulfilled, (state, action) => {
      const data = action.payload;

      if (data.error) {
        const message = data.error.message;
        state.message.signup = message.replaceAll("_", " ");
        state.status.signup = "error";
        return;
      }

      localStorage.setItem("idToken", data.idToken);
      localStorage.setItem("user", data.displayName);
      localStorage.setItem("localId", data.localId);

      state.authenticated = true;
      state.status.signup = "succes";
    })
    .addCase(firebaseSignup.rejected, (state, action) => {
      state.message.signup = "Upss something went wrong!";
      state.status.signup = "error";
    });
};
