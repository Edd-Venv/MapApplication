import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" active>
      Home{" "}
    </NavigationItem>
    <NavigationItem link="/login">Login </NavigationItem>
    <NavigationItem link="/signup">Sign Up </NavigationItem>
    <NavigationItem link="/mylocations">My Locations</NavigationItem>
    <NavigationItem link="/settings">Settings </NavigationItem>
  </ul>
);
export default navigationItems;
