import React from "react";
import Form from "../../../UI/Form/Form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionCreators from "../../../../store/actions/changeuserpassword";
import PropTypes from "prop-types";
import { changePassword } from "../Utils/accountSettings";
import { BaseUrl } from "../../../../index";

class ChangeUserPwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const password = this.props.state.new_password;

    changePassword(`${BaseUrl}account/settings/update/password`, password)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "ok")
          this.setState(() => {
            return { redirect: true };
          });
      });
  };

  render() {
    const {
      state,
      onOldPasswordInputChange,
      onNewPasswordInputChange,
    } = this.props;

    if (this.state.redirect) return <Redirect to="/signout" />;

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
