import React from "react";
import * as actionCreators from "../../../../store/actions/changeusername";
import Form from "../../../UI/Form/Form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { changeUserName } from "../Utils/accountSettings";
import { BaseUrl } from "../../../../index";

class ChangeUserName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const username = this.props.state.new_user_name;
    changeUserName(`${BaseUrl}account/settings/update/username`, username)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "ok")
          this.setState(() => {
            return { redirect: true };
          });
      });
  };

  render() {
    const { state, onNewNameInputChange, onOldNameInputChange } = this.props;

    if (this.state.redirect) return <Redirect to="/signout" />;

    return (
      <Form
        firstInputId="change-user-name-input"
        firstInputType="text/number"
        firstInputLabel="old name"
        firstInputPlaceHolder="Old User Name"
        firstInputValue={state.old_user_name}
        secondInputPlaceHolder="New User Name"
        secondInputType="text/number"
        secondInputLabel="New Name"
        secondInputValue={state.new_user_name}
        buttonType="submit"
        formTitle="Change User Name"
        onOldNameInputChange={onOldNameInputChange}
        onNewNameInputChange={onNewNameInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  state: state.changeusername,
});

const mapDispatchToProps = (dispatch) => ({
  onOldNameInputChange: (event) => {
    dispatch(actionCreators.oldUserNameInput(event.target.value.toUpperCase()));
  },
  onNewNameInputChange: (event) => {
    dispatch(actionCreators.newUserNameInput(event.target.value.toUpperCase()));
  },
});
ChangeUserName.propTypes = {
  state: PropTypes.object.isRequired,
  onOldNameInputChange: PropTypes.func.isRequired,
  onNewNameInputChange: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeUserName);
