import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import Map from "../Map/Map/";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the Map Component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<Map />);

//const mountSetup = () => mount(<ErrorBoundary />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

describe("MAP COMPONENT", () => {
  it("SHOULD RENDER MAP COMPONENT", () => {
    const wrapper = setup();
    const mapComponent = findByTestAttr(wrapper, "component-map");
    expect(mapComponent.length).toBe(1);
  });

  it("SHOULD HAVE AN ERROR BOUNDARY WRAPPING MAP COMPONENT", () => {
    /* //Need To Mount A Class
    const mapWrapper = setup();
    const errorBoundaryWrapper = mountSetup();
    const mapComponent = findByTestAttr(mapWrapper, "component-map");
    const errorBoundaryComponent = findByTestAttr(
      errorBoundaryWrapper,
      "component-error-boundary"
    );
    console.log(errorBoundaryComponent.debug());
    mapComponent.simulateError(new Error("HEY!"));
    console.log(errorBoundaryComponent.debug());

    
    expect(
      findByTestAttr(errorBoundary, "component-error-boundary").length
    ).toBe(1);*/
  });
});
