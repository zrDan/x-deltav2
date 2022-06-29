import React from "react";
import SneakerCard from "./SneakerCard";
import styles from "./styles/List.module.css";

function List(props) {
  return (
    <div className={styles.list}>
      {props.list.map((item) => (
        <SneakerCard key={item.id} product={item} removable={props.removable} />
      ))}
    </div>
  );
}

export default List;
