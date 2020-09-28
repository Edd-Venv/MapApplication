import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Map from "../Map/Map/";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the Map Component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<Map />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

describe("MAP COMPONENT", () => {
  it("SHOULD RENDER MAP COMPONENT", () => {
    const wrapper = setup();
    const mapComponent = findByTestAttr(wrapper, "component-map");
    expect(mapComponent.length).toBe(1);
  });

  it("SHOULD HAVE AN ERROR BOUNDARY WRAPPING MAP COMPONENT", () => {
    const wrapper = setup();
    const mapComponent = findByTestAttr(wrapper, "component-map");
    const errorBoundary = mapComponent.parent();
    console.log(errorBoundary.debug());
    /* work on Test
    expect(
      findByTestAttr(errorBoundary, "component-error-boundary").length
    ).toBe(1);*/
  });
});
