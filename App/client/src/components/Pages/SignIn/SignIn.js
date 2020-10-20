import React from "react";
import { Redirect } from "react-router-dom";
import Form from "../../UI/Form/Form";
import classes from "./SignIn.module.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", password: "", submitted: false };
    this.firstInputRef = React.createRef();
    this.secondInputRef = React.createRef();
  }
  componentDidMount() {
    this.firstInputRef.current.focus();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4030/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.name,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.removeItem("token");
        localStorage.removeItem("userImage");
        localStorage.setItem("token", result.token);
        localStorage.setItem("userImage", result.userImage);
        localStorage.setItem("_id", result._id);
        localStorage.setItem("username", result.username);
        this.setState({ submitted: true });
      })
      .catch((err) => console.log(err));
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
    if (this.state.submitted) return <Redirect to="/" />;
    return (
      <React.Fragment>
        <div className={classes.BackGroundImg} />
        <div data-test="component-sign-in" className={classes.Container}>
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
      </React.Fragment>
    );
  }
}

export default SignIn;
