import React from "react";
import classes from "./DrawerToggle.module.css";

const drawerToggle = (props) => (
  <div
    className={classes.DrawerToggle}
    onClick={props.clicked}
    data-test="component-drawer-toogle"
  >
    <div></div>
    <div></div>
    <div></div>
  </div>
);
export default drawerToggle;
