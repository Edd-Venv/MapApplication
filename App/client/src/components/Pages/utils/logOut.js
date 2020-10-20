import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/signin";

const logOut = () => {
  const { onLogOut } = this.props;
  console.log(this.props);
  onLogOut();
  return <Redirect to="/" />;
};

const mapStateToProps = (state) => ({
  state: state.signin,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => {
    dispatch(actionCreators.setLogOut());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(logOut);
