/* eslint-disable sort-imports */
import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Cockpit from "./containers/Map/Cockpit";
import Layout from "./containers/Layout/Layout";
import SignIn from "./components/Pages/SignIn/SignIn";
import SignUp from "./components/Pages/SignUp/SignUp";
import Settings from "./components/Pages/Settings/Settings";
import MyLocations from "./components/Pages/MyLocations/MyLocations";
import SignOut from "./components/Pages/utils/signOut";
import * as actionCreators from "./store/actions/auth";

class App extends React.Component {
  componentDidMount() {
    const { onAuthentication } = this.props;
    onAuthentication();
  }

  render() {
    return (
      <div data-test="component-app">
        <Layout>
          <Route path="/signout" exact component={SignOut} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/mylocations" exact component={MyLocations} />
          <Route path="/" exact component={Cockpit} />
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  onAuthentication: (state) => dispatch(actionCreators.getAuth(state)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
