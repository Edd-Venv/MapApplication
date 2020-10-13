import React from "react";
import Form from "../../../UI/Form/Form";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/changeuserpassword";
import PropTypes from "prop-types";

class ChangeUserPwd extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const {
      state,
      onOldPasswordInputChange,
      onNewPasswordInputChange,
    } = this.props;
    return (
      <Form
        firstInputId="change-user-password-input"
        firstInputType="password"
        firstInputLabel="Old Password"
        firstInputPlaceHolder="*******"
        firstInputValue={state.name}
        secondInputPlaceHolder="******"
        secondInputType="password"
        secondInputLabel="New Password"
        secondInputValue={state.password}
        buttonType="submit"
        formTitle="Change User Password"
        onNewPasswordInputChange={onNewPasswordInputChange}
        onOldPasswordInputChange={onOldPasswordInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.changeuserpassword,
});

const mapDispatchToProps = (dispatch) => ({
  onOldPasswordInputChange: (event) => {
    dispatch(actionCreators.oldUserPasswordInput(event.target.value));
  },
  onNewPasswordInputChange: (event) => {
    dispatch(actionCreators.newUserPasswordInput(event.target.value));
  },
});

ChangeUserPwd.propsTypes = {
  state: PropTypes.object.isRequired,
  onOldPasswordInputChange: PropTypes.func.isRequired,
  onNewPasswordInputChange: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeUserPwd);
