import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Layout from "../Layout/Layout";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the Layout Component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<Layout />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

describe("LAYOUT COMPONENT", () => {
  it("SHOULD RENDER LAYOUT COMPOENT", () => {
    const wrapper = setup();
    const layoutComponent = findByTestAttr(wrapper, "component-layout");
    expect(layoutComponent.length).toBe(1);
  });
});
