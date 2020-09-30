import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import BackDrop from "../UI/Backdrop";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the Layout Component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<BackDrop />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

describe("BACKDROP COMPONENT", () => {
  it("SHOULD RENDER BACKDROP COMPONENT WHEN NAVIGATION SIDE DRAWER IS OPENED", () => {
    const wrapper = setup();
    const backdropComponent = findByTestAttr(wrapper, "component-backdrop");
    expect(backdropComponent.length).toBe(1);
  });
});
