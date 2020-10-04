import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Settings from "../Pages/Settings/Settings";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the DrawerToggle Component
 * @function shallowSetup
 * @returns {ShallowWrapper}
 */
const shallowSetup = () => shallow(<Settings />);

const findByTestAttr = (wrapper, val) => wrapper().find(`[data-test='${val}']`);
describe("SETTINGS COMPONENT", () => {
  it("SHOULD RENDER SETTINGS COMPONENT", () => {
    const settingsComponent = findByTestAttr(
      shallowSetup,
      "component-settings"
    );
    expect(settingsComponent.length).toBe(1);
  });
});
