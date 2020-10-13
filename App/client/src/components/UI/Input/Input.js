import React from "react";
import classes from "./Input.module.css";

const input = (props) => (
  <input
    value={props.name}
    onChange={props.handleChange}
    required
    className={classes.Input}
    placeholder={props.placeholder}
    type={props.type}
    name={props.name}
  />
);

export default input;
