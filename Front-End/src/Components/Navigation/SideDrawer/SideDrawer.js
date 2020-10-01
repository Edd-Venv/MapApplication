import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) attachedClasses = [classes.SideDrawer, classes.Open];
  return (
    <div data-test="component-side-drawer">
      <Backdrop show={props.open} backdropClicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </div>
  );
};

export default sideDrawer;
