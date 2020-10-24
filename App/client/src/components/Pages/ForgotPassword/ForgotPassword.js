import React from "react";
import { Redirect } from "react-router-dom";
import classes from "./ForgotPassword.module.css";
import Form from "../../UI/Form/Form";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      redirect: false,
      error: false,
    };
    this.firstInputRef = React.createRef();
    this.secondInputRef = React.createRef();
  }

  componentDidMount() {
    this.firstInputRef.current.focus();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, username } = this.state;
    try {
      fetch("http://localhost:4030/forgot/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          this.setState({
            redirect: true,
          });
        })
        .catch((err) => console.log(err));
    } catch (err) {
      this.setState({
        error: true,
        err,
      });
    }
  };

  handleChange = (event) => {
    if (event.target.name === "email")
      this.setState({ email: event.target.value });
    else this.setState({ username: event.target.value });
  };

  render() {
    if (this.state.redirect) return <Redirect to="/" />;

    return (
      <React.Fragment>
        <div className={classes.BackGroundImg} />
        <div
          data-test="component-forgot-password"
          className={classes.Container}
        >
          <Form
            firstInputOnKeyDown={this.onfirstInputKeyDown}
            firstInputValue={this.state.username}
            firstInputType="text/number"
            firstInputLabel="username"
            firstInputPlaceHolder={
              this.state.error ? "No Account Found." : "Username"
            }
            firstInputRef={this.firstInputRef}
            secondInputPlaceHolder="johndoe@gmail.com"
            secondInputType="text"
            secondInputLabel="email"
            secondInputRef={this.secondInputRef}
            secondInputValue={this.state.email}
            buttonType="submit"
            formTitle="Forgot Password"
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </React.Fragment>
    );
  }
}
export default ForgotPassword;
