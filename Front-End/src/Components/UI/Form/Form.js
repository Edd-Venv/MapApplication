import React from "react";
import Button from "../Button/Button";
import classes from "./Form.module.css";

const form = (props) => (
  <form
    className={classes.Form}
    autoComplete="off"
    onSubmit={props.handleSubmit}
  >
    <p>{props.formTitle}</p>
    <div>
      <label htmlFor={props.firstInputLabel} />
      <input
        name={props.firstInputLabel}
        type={props.firstInputType}
        value={props.firstInputValue}
        onChange={props.handleChange}
        ref={props.firstInputRef}
      />
    </div>

    <div>
      <label htmlFor={props.secondInputLabel} />
      <input
        name={props.secondInputLabel}
        type={props.secondInputType}
        value={props.secondInputValue}
        onChange={props.handleChange}
        ref={props.secondInputRef}
      />
    </div>
    <Button type={props.buttonType}>SignIn </Button>
  </form>
);

export default form;
