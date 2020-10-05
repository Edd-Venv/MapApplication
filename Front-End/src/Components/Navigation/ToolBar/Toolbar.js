import React from "react";
import classes from "./Toolbar.module.css";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import NavigationItems from "../NavigationItems/NavigationItems";
import UserInfo from "../UserInfo/UserInfo";

const toolbar = (props) => (
  <header className={classes.Toolbar} data-test="component-toolbar">
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div>
      <UserInfo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);
export default toolbar;
