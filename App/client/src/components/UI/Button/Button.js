import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.css";

const button = (props) => {
  const assignedClasses = [classes.Button, props.className].join(" ");
  return (
    <button
      className={assignedClasses}
      type={props.type}
      onClick={props.buttonClick}
    >
      {props.children}
    </button>
  );
};

button.propTypes = {
  buttonClick: PropTypes.func,
  buttonType: PropTypes.string,
  children: PropTypes.any,
};
export default button;
