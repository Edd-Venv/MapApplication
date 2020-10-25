import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import classes from "./Form.module.css";

const form = (props) => {
  const { onBlobInputChange, formTitle } = props;
  let forgotPassword = null;
  let pictureUpload = null;
  let signInOptions = null;
  let signUpOptions = null;
  let firstInputIcon = null;
  let secondInputIcon = null;

  if (formTitle === "Sign In") {
    firstInputIcon = <i className={`bx bx-user ${classes.Login_icon}`} />;
    secondInputIcon = <i className={`bx bx-lock ${classes.Login_icon}`} />;

    forgotPassword = (
      <Link to="/forgot/password" className={classes.Login_forgot}>
        Forgot your password?
      </Link>
    );

    signInOptions = (
      <div>
        <span className={classes.Login_account}>Don't have an account?</span>
        <Link className={classes.Login_signin} to="/signup">
          Sign Up
        </Link>
      </div>
    );
  }

  if (formTitle === "Sign Up") {
    firstInputIcon = <i className={`bx bx-user ${classes.Login_icon}`} />;
    secondInputIcon = <i className={`bx bx-lock ${classes.Login_icon}`} />;

    pictureUpload = (
      <div>
        <p>Add A Photo (Optional)</p>
        <label htmlFor="photo" className={classes.FileUpload}>
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

    signUpOptions = (
      <div>
        {" "}
        <span className={classes.Login_account}>Already have an account?</span>
        <Link className={classes.Login_signup} to="/signin">
          Sign In
        </Link>
      </div>
    );
  }

  if (formTitle === "Forgot Password") {
    firstInputIcon = <i className={`bx bx-user ${classes.Login_icon}`} />;
    secondInputIcon = <i className={`bx bx-mail-send ${classes.Login_icon}`} />;
  }

  if (formTitle === "Reset") {
    firstInputIcon = <i className={`bx bx-lock ${classes.Login_icon}`} />;
    secondInputIcon = <i className={`bx bx-lock ${classes.Login_icon}`} />;
  }

  return (
    <div className={classes.Login_forms}>
      <form
        className={classes.Login_Register}
        autoComplete="off"
        onSubmit={props.handleSubmit}
        id="formID"
      >
        <h3 className={classes.Login_title}>{formTitle}</h3>
        <div className={classes.Login_box}>
          {firstInputIcon}
          <input
            id="inputID"
            className={classes.Login_input}
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
        <div className={classes.Login_box}>
          {secondInputIcon}
          <input
            className={classes.Login_input}
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

        {pictureUpload}
        <div>
          {" "}
          {forgotPassword}
          <Button type={props.buttonType}>Submit</Button>
        </div>

        {signInOptions}
        {signUpOptions}
      </form>
    </div>
  );
};

export default form;

/*

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

*/
