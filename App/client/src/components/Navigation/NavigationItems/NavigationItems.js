import React from "react";
import { connect } from "react-redux";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

class NavigationItems extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
    };
  }

  componentDidMount() {
    this.setState({ authenticated: this.props.state.authenticated });
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
    let signIn = null;
    let signUp = null;
    let signOut = null;

    if (!this.state.authenticated) {
      signIn = (
        <NavigationItem
          link="/signin"
          data-test="sign-in-link"
          closeBackDrop={this.props.closeBackDrop}
        >
          Sign In{" "}
        </NavigationItem>
      );
      signUp = (
        <NavigationItem
          link="/signup"
          data-test="sign-up-link"
          closeBackDrop={this.props.closeBackDrop}
        >
          Sign Up{" "}
        </NavigationItem>
      );
    }

    if (this.state.authenticated) {
      signOut = <NavigationItem link="/signout">Sign Out</NavigationItem>;
    }
    return (
      <ul
        className={classes.NavigationItems}
        data-test="component-navigation-items"
      >
        <NavigationItem
          link="/"
          data-test="home-link"
          closeBackDrop={this.props.closeBackDrop}
        >
          Home{" "}
        </NavigationItem>
        {signIn}
        {signUp}
        <NavigationItem
          link="/mylocations"
          data-test="my-locations-link"
          closeBackDrop={this.props.closeBackDrop}
        >
          My Locations
        </NavigationItem>
        <NavigationItem
          link="/settings"
          data-test="settings-link"
          closeBackDrop={this.props.closeBackDrop}
        >
          Settings{" "}
        </NavigationItem>
        {signOut}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.auth,
});

export default connect(mapStateToProps)(NavigationItems);
