import React from "react";
import classes from "./CloseButton.module.css";

const CloseButton = (props) => (
  <button onClick={props.onClick} className={classes.Closebutton}>
    {props.children}
  </button>
);

export default CloseButton;
