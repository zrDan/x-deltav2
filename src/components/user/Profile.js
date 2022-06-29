import React, { useEffect, useState } from "react";
import styles from "./styles/Profile.module.css";

const icons = ["fa-solid fa-user-astronaut", "fa-solid fa-user-ninja"];

function Profile() {
  const [icon, setIcon] = useState("");
  const name = localStorage.getItem("user");

  useEffect(() => {
    const random = Math.floor(Math.random() * 2);
    setIcon(icons[random]);
  }, []);

  return (
    <div className={styles.profile}>
      <i className={icon}></i>
      <span>{name}</span>
    </div>
  );
}

export default Profile;
