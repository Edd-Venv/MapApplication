import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/signin";
import * as authActionCreators from "../../../store/actions/auth";
import Background from "../../UI/Background/Background";
import Form from "../../UI/Form/Form";
import toolTip from "../../UI/ToolTip/ToolTip";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", password: "", submitted: false, redirect: false };
    this.firstInputRef = React.createRef();
    this.secondInputRef = React.createRef();
  }
  componentDidMount() {
    this.firstInputRef.current.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    const { state, onAuthentication } = this.props;

    if (state.signInError)
      toolTip("signin", "inputID", "formID", state.message);

    if (prevState.submitted && !state.signInError) {
      onAuthentication();
      this.setState({ redirect: true });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onSignIn } = this.props;

    onSignIn(this.state, () =>
      this.setState({ name: "", password: "", submitted: true })
    );
  };

  handleChange = (event) => {
    if (event.target.name === "name")
      this.setState({ name: event.target.value.toUpperCase() });
    else this.setState({ password: event.target.value });
  };

  onfirstInputKeyDown = (event) => {
    if (event.key === "Enter") this.secondInputRef.current.focus();
  };

  render() {
    const { state } = this.props;
    if (this.state.redirect) return <Redirect to="/" />;

    return (
      <Background data_test="component-sign-in">
        <Form
          firstInputOnKeyDown={this.onfirstInputKeyDown}
          firstInputValue={this.state.name}
          firstInputType="text"
          firstInputLabel="name"
          firstInputPlaceHolder={
            state.signInError ? "Account Not Found" : "User Name"
          }
          firstInputRef={this.firstInputRef}
          secondInputPlaceHolder="Password"
          secondInputType="password"
          secondInputLabel="password"
          secondInputRef={this.secondInputRef}
          secondInputValue={this.state.password}
          buttonType="submit"
          formTitle="Sign In"
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Background>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.signin,
});

const mapDispatchToProps = (dispatch) => ({
  onSignIn: (state, cb) => {
    dispatch(actionCreators.getSignIn(state));
    cb();
  },
  onAuthentication: (state) =>
    dispatch(
      authActionCreators.setAuth({
        authenticated: true,
      })
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
