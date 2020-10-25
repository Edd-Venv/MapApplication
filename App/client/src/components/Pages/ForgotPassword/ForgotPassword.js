import React from "react";
import { Redirect } from "react-router-dom";
import Background from "../../UI/Background/Background";
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
    else this.setState({ username: event.target.value.toUpperCase() });
  };

  render() {
    if (this.state.redirect) return <Redirect to="/" />;

    return (
      <Background data_test="component-forgot-password">
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
      </Background>
    );
  }
}
export default ForgotPassword;
