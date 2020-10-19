import React from "react";
import classes from "./Settings.module.css";
import isAuthorized from "../utils/isAuthorized";
import Spinner from "../../UI/Spinner/Spinner";
import SettingsForm from "../../UI/Form/SettingsForm/SettingsForm";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false, isLoading: true };
  }

  componentDidMount() {
    const isAuth = isAuthorized(
      "http://localhost:4030/account/settings/update/username",
      "PATCH"
    );
    isAuth.then((res) => {
      const { authorized, error } = res;

      if (!authorized) {
        this.setState((prevState) => ({
          error: !prevState.error,
          errorStatus: error.statusCode,
          errorMessage: error.message,
          isLoading: !prevState.isLoading,
        }));
      } else {
        this.setState((prevState) => ({
          isLoading: !prevState.isLoading,
        }));
      }
    });
  }

  render() {
    if (this.state.error) return <p>You are not Authorized</p>;

    if (this.state.isLoading) return <Spinner />;

    return (
      <div data-test="component-settings">
        <div className={classes.BackGroundImg} />
        <SettingsForm />
      </div>
    );
  }
}

export default Settings;
