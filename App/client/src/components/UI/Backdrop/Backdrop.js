import React from "react";
import classes from "./Backdrop.module.css";

const backdrop = (props) => {
  return props.show ? (
    <div
      data-test="component-backdrop"
      className={classes.Backdrop}
      onClick={props.backdropClicked}
    />
  ) : null;
};

export default backdrop;
