import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../../redux/reducer/auth";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import styles from "./styles/NavBar.module.css";

function NavBar() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(Logout());
  };

  return (
    <nav className={styles.navbar}>
      <Link to={"/"}>
        <img src="/logo.webp" alt="logo" />
      </Link>
      <Mobile onLogout={logoutHandler} />
      <Desktop onLogout={logoutHandler} />
    </nav>
  );
}

export default NavBar;
