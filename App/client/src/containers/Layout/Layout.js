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
    const { logOut } = this.props;
    return (
      <div data-test="component-layout">
        <ToolBar
          logOut={logOut}
          drawerToggleClicked={this.handleSideDrawerToggle}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.handleSideDrawerClose}
          logOut={logOut}
        />

        <main>{this.props.children}</main>
      </div>
    );
  }
}
export default Layout;
