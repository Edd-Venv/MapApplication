import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as authAction from "../../../store/actions/auth";
import * as actionCreators from "../../../store/actions/signin";

class signOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }
  componentWillUnmount() {
    const { onAuth } = this.props;
    onAuth();
  }
  componentDidMount() {
    const { onLogOut } = this.props;
    onLogOut();
    this.setState({ redirect: true });
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
    dispatch(actionCreators.signOut());
  },
  onAuth: () => {
    dispatch(
      authAction.setAuth({
        authenticated: false,
      })
    );
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(signOut);
