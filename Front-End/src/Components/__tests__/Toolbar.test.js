import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Toolbar from "../Navigation/ToolBar/Toolbar";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the Layout Component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<Toolbar />);
const mountSetup = () => mount(<Toolbar />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

describe("TOOL-BAR COMPONENT", () => {
  const shallowWrapper = setup();
  const mountWrapper = mountSetup();
  const toolBarComponentMount = findByTestAttr(
    mountWrapper,
    "component-toolbar"
  );
  const toolBarComponent = findByTestAttr(shallowWrapper, "component-toolbar");

  it("SHOULD RENDER TOOL-BAR COMPONENT", () => {
    expect(toolBarComponent.length).toBe(1);
  });
  it("SHOULD CONTAIN NAVIGATION-ITEMS COMPONENT", () => {
    const navigationComponent = findByTestAttr(
      toolBarComponentMount,
      "component-navigation-items"
    );
    expect(navigationComponent).toBeTruthy();
  });
});
