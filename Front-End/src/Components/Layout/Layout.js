import React from "react";

const layout = (props) => (
  <div data-test="component-layout">
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>{props.children}</main>
  </div>
);
export default layout;
