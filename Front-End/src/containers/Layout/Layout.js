import React from "react";
import ToolBar from "../../components/Navigation/ToolBar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showSideDrawer: false,
    };
  }
  handleSideDrawerClose = () => {
    this.setState({ showSideDrawer: false });
  };
  handleSideDrawerToggle = () => {
    this.setState((prevState, prevProps) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <div data-test="component-layout">
        <ToolBar drawerToggleClicked={this.handleSideDrawerToggle} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.handleSideDrawerClose}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}
export default Layout;
