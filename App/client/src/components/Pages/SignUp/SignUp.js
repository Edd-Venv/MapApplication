import React from "react";
import * as actionCreators from "../../../store/actions/signup";
import { connect } from "react-redux";
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
    console.log(this.props.state);
    console.log("handlesubmitCalled");
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
