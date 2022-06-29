import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./styles/Desktop.module.css";

function Desktop(props) {
  const authenticated = useSelector((state) => state.auth.authenticated);

  return (
    <ul className={styles.navDesktop}>
      <li>
        <Link to={"/"}>
          <i className="fa-solid fa-house"></i>
        </Link>
      </li>
      <li>
        <Link to={"/user"}>
          <i className="fa-solid fa-user-astronaut"></i>
        </Link>
      </li>
      <li>
        <Link to={"/favorites"}>
          <i className="fa-solid fa-heart"></i>
        </Link>
      </li>
      <li>
        {authenticated && (
          <Link to={"/"} onClick={props.onLogout}>
            <button type="button">Logout</button>
          </Link>
        )}
        {!authenticated && (
          <Link to={"/auth"}>
            <button type="button">Login</button>
          </Link>
        )}
      </li>
    </ul>
  );
}

export default Desktop;
