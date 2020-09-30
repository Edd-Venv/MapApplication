import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.css";

const button = (props) => (
  <button
    className={[classes.Button, props.buttonType].join(" ")}
    type="button"
    onClick={props.buttonClick}
  >
    {props.children}
  </button>
);

button.propTypes = {
  buttonClick: PropTypes.func,
  buttonType: PropTypes.string,
  children: PropTypes.any,
};
export default button;
