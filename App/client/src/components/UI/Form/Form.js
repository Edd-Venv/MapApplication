import React from "react";
import { Link } from "react-router-dom";

import Button from "../Button/Button";
import classes from "./Form.module.css";

const form = (props) => {
  const { onBlobInputChange, formTitle } = props;
  let forgotPassword = null;
  let pictureUpload = null;

  if (formTitle === "Sign In") {
    forgotPassword = (
      <Link to="/forgot/password" style={{ textDecorationLine: "none" }}>
        <p className={classes.ForgotPassword}>Forgot your password?</p>
      </Link>
    );
  }
  if (formTitle === "Sign Up") {
    pictureUpload = (
      <div>
        <label htmlFor="photo" className={classes.CustomFileUpload}>
          Click To Add Photo ( Optional )
          <input
            className={classes.CustomFileInput}
            onChange={onBlobInputChange}
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
          />
        </label>
      </div>
    );
  }

  return (
    <form
      className={classes.Form}
      autoComplete="off"
      onSubmit={props.handleSubmit}
      id="formID"
    >
      <h3 style={{ fontFamily: "Oswald, sans-serif" }}>{formTitle}</h3>
      <div>
        <label htmlFor={props.firstInputLabel} />
        <input
          id="inputID"
          className={classes.Inputs}
          name={props.firstInputLabel}
          type={props.firstInputType}
          value={props.firstInputValue}
          onChange={
            props.onNameInputChange ||
            props.onOldPasswordInputChange ||
            props.onOldNameInputChange ||
            props.handleChange
          }
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
          onChange={
            props.onPasswordInputChange ||
            props.onNewPasswordInputChange ||
            props.onNewNameInputChange ||
            props.handleChange
          }
          ref={props.secondInputRef}
          placeholder={props.secondInputPlaceHolder}
        />
      </div>
      {forgotPassword}
      {pictureUpload}
      <div>
        {" "}
        <Button type={props.buttonType}>Submit</Button>
      </div>
    </form>
  );
};

export default form;
