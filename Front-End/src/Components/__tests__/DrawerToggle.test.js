import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Layout from "../../containers/Layout/Layout";
import DrawerToggle from "../Navigation/SideDrawer/DrawerToggle/DrawerToggle";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the DrawerToggle Component
 * @function shallowSetup
 * @returns {ShallowWrapper}
 */
const shallowSetup = () => shallow(<DrawerToggle />);

/**
 * Factory function to create a MountWrapper for the Layout Component
 * @function setup
 * @param {Node}  LayoutComponent
 * @returns {MountWrapper}
 */
const setup = () => mount(<Layout />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

describe("DRAWER-TOGGLE COMPONENT", () => {
  it("SHOULD RENDER DRAWER-TOGGLE COMPONENT", () => {
    const wrapper = shallowSetup();
    const toggleDrawerComponent = findByTestAttr(
      wrapper,
      "component-drawer-toogle"
    );
    expect(toggleDrawerComponent.length).toBe(1);
  }),
    it("SHOULD OPEN SIDE-DRAWER AFTER CLICK ", () => {
      const wrapper = setup();
      const toggleDrawerComponent = findByTestAttr(
        wrapper,
        "component-drawer-toogle"
      );

      toggleDrawerComponent.simulate("click");

      expect(wrapper.state().showSideDrawer).toBeTruthy();
    });
});
