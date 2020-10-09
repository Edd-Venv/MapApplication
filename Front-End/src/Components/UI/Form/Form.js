import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import classes from "./Form.module.css";

const form = (props) => {
  const {
    onBlobInputChange,
    onNameInputChange,
    onPasswordInputChange,
    onOldNameInputChange,
    onNewNameInputChange,
    onNewPasswordInputChange,
    onOldPasswordInputChange,
    handleChange,
    formTitle,
  } = props;
  let forgotPassword = null;
  let pictureUpload = null;

  if (formTitle === "Sign In") {
    forgotPassword = (
      <Link to="/forgotPassword" style={{ textDecorationLine: "none" }}>
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
    >
      <h3 style={{ fontFamily: "Oswald, sans-serif" }}>{formTitle}</h3>
      <div>
        <label htmlFor={props.firstInputLabel} />
        <input
          className={classes.Inputs}
          name={props.firstInputLabel}
          type={props.firstInputType}
          value={props.firstInputValue}
          onChange={
            onNameInputChange ||
            onOldPasswordInputChange ||
            onOldNameInputChange ||
            handleChange
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
            onPasswordInputChange ||
            onNewPasswordInputChange ||
            onNewNameInputChange ||
            handleChange
          }
          ref={props.secondInputRef}
          placeholder={props.secondInputPlaceHolder}
        />
      </div>
      {forgotPassword}
      {pictureUpload}
      <div>
        {" "}
        <Button type={props.buttonType}>{formTitle}</Button>
      </div>
    </form>
  );
};

export default form;
