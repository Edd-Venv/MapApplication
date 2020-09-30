import React from "react";

const layout = (props) => (
  <fragment data-test="component-layout">
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>{props.children}</main>
  </fragment>
);
export default layout;
