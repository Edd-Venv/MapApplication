import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the Layout Component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<SideDrawer />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

describe("SIDE DRAWER COMPONENT", () => {
  it("SHOULD RENDER SIDE DRAWER COMPONENT", () => {
    const wrapper = setup();
    const layoutComponent = findByTestAttr(wrapper, "component-side-drawer");
    expect(layoutComponent.length).toBe(1);
  });
});
