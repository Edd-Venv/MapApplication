import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul
    className={classes.NavigationItems}
    data-test="component-navigation-items"
  >
    <NavigationItem
      link="/"
      data-test="home-link"
      closeBackDrop={props.closeBackDrop}
    >
      Home{" "}
    </NavigationItem>
    <NavigationItem
      link="/signin"
      data-test="sign-in-link"
      closeBackDrop={props.closeBackDrop}
    >
      Sign In{" "}
    </NavigationItem>
    <NavigationItem
      link="/signup"
      data-test="sign-up-link"
      closeBackDrop={props.closeBackDrop}
    >
      Sign Up{" "}
    </NavigationItem>
    <NavigationItem
      link="/mylocations"
      data-test="my-locations-link"
      closeBackDrop={props.closeBackDrop}
    >
      My Locations
    </NavigationItem>
    <NavigationItem
      link="/settings"
      data-test="settings-link"
      closeBackDrop={props.closeBackDrop}
    >
      Settings{" "}
    </NavigationItem>
  </ul>
);

export default navigationItems;
