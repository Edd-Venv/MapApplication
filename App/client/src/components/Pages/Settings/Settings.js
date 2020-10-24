import React from "react";
import { connect } from "react-redux";
import Background from "../../UI/Background/Background";
import Spinner from "../../UI/Spinner/Spinner";
import NotAuthorized from "../404";
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
    if (!this.state.authenticated) return <NotAuthorized />;

    if (this.state.isLoading) return <Spinner />;

    return (
      <Background data_test="component-settings">
        <SettingsForm />
      </Background>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.auth,
});

export default connect(mapStateToProps)(Settings);
