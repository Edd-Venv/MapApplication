import React from "react";
import Form from "../../UI/Form/Form";
import classes from "./SignIn.module.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", password: "" };
    this.firstInputRef = React.createRef();
    this.secondInputRef = React.createRef();
  }
  componentDidMount() {
    this.firstInputRef.current.focus();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handlesubmitCalled");
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
    return (
      <div data-test="component-sign-in">
        <Form
          firstInputOnKeyDown={this.onfirstInputKeyDown}
          firstInputValue={this.state.name}
          firstInputType="text"
          firstInputLabel="name"
          firstInputPlaceHolder="User Name"
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
      </div>
    );
  }
}

export default SignIn;
