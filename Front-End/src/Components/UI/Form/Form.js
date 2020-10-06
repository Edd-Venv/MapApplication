import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import classes from "./Form.module.css";

const form = (props) => {
  let forgotPassword = null;

  if (props.formTitle === "Sign In") {
    forgotPassword = (
      <Link to="/forgotPassword" style={{ textDecorationLine: "none" }}>
        <p className={classes.ForgotPassword}>Forgot your password?</p>
      </Link>
    );
  }

  return (
    <form
      className={classes.Form}
      autoComplete="off"
      onSubmit={props.handleSubmit}
    >
      <h3>{props.formTitle}</h3>
      <div>
        <label htmlFor={props.firstInputLabel} />
        <input
          className={classes.Inputs}
          name={props.firstInputLabel}
          type={props.firstInputType}
          value={props.firstInputValue}
          onChange={props.handleChange}
          ref={props.firstInputRef}
          placeholder={props.firstInputPlaceHolder}
        />
      </div>

      <div>
        <label htmlFor={props.secondInputLabel} />
        <input
          className={classes.Inputs}
          name={props.secondInputLabel}
          type={props.secondInputType}
          value={props.secondInputValue}
          onChange={props.handleChange}
          ref={props.secondInputRef}
          placeholder={props.secondInputPlaceHolder}
        />
      </div>
      {forgotPassword}
      <div>
        {" "}
        <Button type={props.buttonType}>SignIn </Button>
      </div>
    </form>
  );
};

export default form;
