import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./styles/Mobile.module.css";

function Mobile(props) {
  const [mobileStyle, setMobileStyle] = useState(undefined);
  const authenticated = useSelector((state) => state.auth.authenticated);

  const showMovileMenu = () => {
    setMobileStyle(styles.mobileMenuVisible);
    document.body.style.overflow = "hidden";
  };

  const hideMobileMenu = () => {
    setMobileStyle(styles.mobileMenuInvisible);
    document.body.style.overflow = "visible";
  };

  const endSessionHandler = () => {
    hideMobileMenu();
    props.onLogout();
  };

  return (
    <div className={styles.mobileNav}>
      <span onClick={showMovileMenu}>
        <i className="fa-solid fa-bars"></i>
      </span>
      <div className={mobileStyle}>
        <span onClick={hideMobileMenu}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </span>
        <ul>
          <li>
            <Link to={"/"} onClick={hideMobileMenu}>
              <i className="fa-solid fa-house"></i>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/user"} onClick={hideMobileMenu}>
              <i className="fa-solid fa-user-astronaut"></i>
              Profile
            </Link>
          </li>
          <li>
            <Link to={"/favorites"} onClick={hideMobileMenu}>
              <i className="fa-solid fa-heart"></i>
              Favorites
            </Link>
          </li>
          <li>
            {authenticated && (
              <Link to={"/"} onClick={endSessionHandler}>
                <i className="fa-solid fa-door-open"></i>
                Logout
              </Link>
            )}
            {!authenticated && (
              <Link to={"/auth"} onClick={hideMobileMenu}>
                <i className="fa-solid fa-door-closed"></i>
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Mobile;
