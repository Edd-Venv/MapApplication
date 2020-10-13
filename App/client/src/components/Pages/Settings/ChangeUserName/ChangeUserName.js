import React from "react";
import * as actionCreators from "../../../../store/actions/changeusername";
import Form from "../../../UI/Form/Form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import handleToolTip from "../Utils/tooltip.js";

class ChangeUserName extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
  };

  render() {
    const { state, onNewNameInputChange, onOldNameInputChange } = this.props;

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

/*handleToolTip(
    "change-user-name-tool-tip",
    "change-user-name-input",
    "change-user-name-form"
  );

  useEffect(() => {
    if (document.getElementById("change-user-name-tool-tip")) {
      const setToolTip = document.getElementById("change-user-name-tool-tip");
      if (state.message !== "") setToolTip.textContent = state.message;

      setTimeout(() => {
        setToolTip.textContent = "";
      }, 3000);
    }
  }, [state.message]);*/
