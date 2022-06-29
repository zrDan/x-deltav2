import React from "react";
import Modal from "./Modal";

function Error(props) {
  return <Modal onHideModal={props.onCloseModal}>{props.message}</Modal>;
}

export default Error;
