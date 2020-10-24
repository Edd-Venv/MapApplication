import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as cockpitActionCreator from "../../../store/actions/cockpit";
import * as authActionCreator from "../../../store/actions/auth";
import * as signOutActionCreator from "../../../store/actions/signin";

class signOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }

  componentDidMount() {
    const { onLogOut } = this.props;
    onLogOut();
    this.setState({ redirect: true });
  }

  componentWillUnmount() {
    const { onAuth, onResetCockpitState } = this.props;
    onAuth();
    onResetCockpitState();
  }

  render() {
    if (this.state.redirect) return <Redirect to="/" />;
    return null;
  }
}

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => {
    dispatch(signOutActionCreator.signOut());
  },
  onAuth: () => {
    dispatch(
      authActionCreator.setAuth({
        authenticated: false,
      })
    );
  },
  onResetCockpitState: () => {
    dispatch(cockpitActionCreator.resetState());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(signOut);
