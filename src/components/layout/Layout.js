import React from "react";
import NavBar from "../navigation/NavBar";

function Layout(props) {
  return (
    <div>
      <NavBar />
      {props.children}
    </div>
  );
}

export default Layout;
