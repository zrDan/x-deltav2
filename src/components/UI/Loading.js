import React from "react";
import styles from "./styles/Loading.module.css";

function Loading() {
  return (
    <div className={styles.load}>
      <i className="fa-brands fa-instalod fa-spin"></i>
    </div>
  );
}

export default Loading;
