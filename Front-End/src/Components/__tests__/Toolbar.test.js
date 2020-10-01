import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Toolbar from "../Navigation/ToolBar/Toolbar";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the Layout Component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<Toolbar />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

describe("TOOL-BAR COMPONENT", () => {
  it("SHOULD RENDER TOOL-BAR COMPONENT", () => {
    const wrapper = setup();
    const toolBarComponent = findByTestAttr(wrapper, "component-toolbar");
    expect(toolBarComponent.length).toBe(1);
  });
});
