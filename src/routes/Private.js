import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Private({ component: Component }) {
  const authenticated = useSelector((state) => state.auth.authenticated);

  return (
    <Fragment>
      {authenticated ? Component : <Navigate to={"/auth"} replace />}
    </Fragment>
  );
}

export default Private;
