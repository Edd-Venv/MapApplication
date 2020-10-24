import React from "react";
import { connect } from "react-redux";
import classes from "./Settings.module.css";
import Spinner from "../../UI/Spinner/Spinner";
import SettingsForm from "../../UI/Form/SettingsForm/SettingsForm";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false, isLoading: true };
  }

  componentDidMount() {
    this.setState({
      authenticated: this.props.state.authenticated,
      isLoading: false,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.state.authenticated === this.state.authenticated)
      return false;
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.setState.authenticated !== prevProps.state.authenticated) {
      this.setState({ authenticated: prevProps.state.authenticated });
    }
  }

  render() {
    if (!this.state.authenticated) return <p>You are not Authorized</p>;

    if (this.state.isLoading) return <Spinner />;

    return (
      <div data-test="component-settings">
        <div className={classes.BackGroundImg} />
        <SettingsForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.auth,
});

export default connect(mapStateToProps)(Settings);
