import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";

function Auth() {
  const authenticated = useSelector((state) => state.auth.authenticated);

  return (
    <Fragment>
      {!authenticated ? <AuthPage /> : <Navigate to={"/"} replace />}
    </Fragment>
  );
}

export default Auth;
