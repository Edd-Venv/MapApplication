import React from "react";
import * as actionCreators from "../../../store/actions/signup";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Form from "../../UI/Form/Form";
import classes from "../SignIn/SignIn.module.css";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.firstInputRef = React.createRef();
    this.secondInputRef = React.createRef();
  }
  componentDidMount() {
    this.firstInputRef.current.focus();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", this.props.state.name);
    formData.append("password", this.props.state.password);

    if (this.props.state.blob) formData.append("photo", this.props.state.blob);
    try {
      fetch("http://localhost:4030/sign-up", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("res", res);
          if (res.status === "ok")
            return <Redirect to="http://localhost:3000" />;
        })
        .catch((error) => {
          throw new Error("Sign-UpCli", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  onfirstInputKeyDown = (event) => {
    if (event.key === "Enter") this.secondInputRef.current.focus();
  };

  render() {
    const {
      state,
      onBlobInputChange,
      onNameInputChange,
      onPasswordInputChange,
    } = this.props;
    return (
      <React.Fragment>
        <div className={classes.BackGroundImg} />
        <div data-test="component-sign-up" className={classes.Container}>
          <Form
            firstInputOnKeyDown={this.onfirstInputKeyDown}
            firstInputValue={state.name}
            firstInputType="text"
            firstInputLabel="name"
            firstInputPlaceHolder="User Name"
            firstInputRef={this.firstInputRef}
            secondInputPlaceHolder="Password"
            secondInputType="password"
            secondInputLabel="password"
            secondInputRef={this.secondInputRef}
            secondInputValue={state.password}
            buttonType="submit"
            formTitle="Sign Up"
            onBlobInputChange={onBlobInputChange}
            onNameInputChange={onNameInputChange}
            onPasswordInputChange={onPasswordInputChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  state: state.signup,
});
const mapDispatchToProps = (dispatch) => ({
  onNameInputChange: (event) => {
    dispatch(actionCreators.userNameInput(event.target.value.toUpperCase()));
  },
  onPasswordInputChange: (event) => {
    dispatch(actionCreators.userPasswordInput(event.target.value));
  },
  onBlobInputChange: (event) => {
    const blob = new Blob([event.target.files[0]], { type: "image/jpeg" });
    dispatch(actionCreators.userPictureFileInput(blob));
  },
});

SignUp.propTypes = {
  state: PropTypes.object.isRequired,
  onNameInputChange: PropTypes.func.isRequired,
  onPasswordInputChange: PropTypes.func.isRequired,
  onBlobInputChange: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
