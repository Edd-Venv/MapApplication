import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul
    className={classes.NavigationItems}
    data-test="component-navigation-items"
  >
    <NavigationItem link="/" active data-test="home-link">
      Home{" "}
    </NavigationItem>
    <NavigationItem link="/signin" data-test="sign-in-link">
      Sign In{" "}
    </NavigationItem>
    <NavigationItem link="/signup" data-test="sign-up-link">
      Sign Up{" "}
    </NavigationItem>
    <NavigationItem link="/mylocations" data-test="my-locations-link">
      My Locations
    </NavigationItem>
    <NavigationItem link="/settings" data-test="settings-link">
      Settings{" "}
    </NavigationItem>
  </ul>
);
export default navigationItems;
