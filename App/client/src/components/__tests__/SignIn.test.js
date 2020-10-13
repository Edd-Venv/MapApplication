import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import SignIn from "../Pages/SignIn/SignIn";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the DrawerToggle Component
 * @function shallowSetup
 * @returns {ShallowWrapper}
 */
const shallowSetup = () => shallow(<SignIn />);
const findByTestAttr = (wrapper, val) => wrapper().find(`[data-test='${val}']`);

describe("SIGN-IN COMPONENT", () => {
  it("SHOULD RENDER SIGN-IN COMPONENT", () => {
    const signInComponent = findByTestAttr(shallowSetup, "component-sign-in");
    expect(signInComponent.length).toBe(1);
  });
});
