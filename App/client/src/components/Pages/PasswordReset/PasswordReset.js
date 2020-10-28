import React from "react";
import { Redirect } from "react-router-dom";
import Background from "../../UI/Background/Background";
import Form from "../../UI/Form/Form";
import { BaseUrl } from "../../../index";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newpassword: "",
      confirmpassword: "",
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
    const { newpassword, confirmpassword } = this.state;
    if (newpassword === confirmpassword) {
      fetch(`${BaseUrl}reset/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newpassword,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          this.setState({
            newpassword: "",
            confirmpassword: "",
            redirect: true,
            error: false,
          });
        })
        .catch((err) => console.log(err));
    } else
      this.setState({
        error: true,
      });
  };

  handleChange = (event) => {
    if (event.target.name === "newpassword")
      this.setState({ newpassword: event.target.value });
    else this.setState({ confirmpassword: event.target.value });
  };

  onfirstInputKeyDown = (event) => {
    if (event.key === "Enter") this.secondInputRef.current.focus();
  };

  render() {
    if (this.state.redirect) return <Redirect to="/" />;

    return (
      <Background data_test="component-password-reset">
        <Form
          firstInputOnKeyDown={this.onfirstInputKeyDown}
          firstInputValue={this.state.newpassword}
          firstInputType="password"
          firstInputLabel="newpassword"
          firstInputPlaceHolder={
            this.state.error ? "Match Passwords" : "New Password"
          }
          firstInputRef={this.firstInputRef}
          secondInputPlaceHolder="Confirm Password"
          secondInputType="password"
          secondInputLabel="confirmpassword"
          secondInputRef={this.secondInputRef}
          secondInputValue={this.state.confirmpassword}
          buttonType="submit"
          formTitle="Reset"
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Background>
    );
  }
}
export default ResetPassword;
