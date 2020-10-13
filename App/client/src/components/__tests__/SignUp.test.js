import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import SignUp from "../Pages/SignUp/SignUp";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the DrawerToggle Component
 * @function shallowSetup
 * @returns {ShallowWrapper}
 */
const shallowSetup = () => shallow(<SignUp />);
const findByTestAttr = (wrapper, val) => wrapper().find(`[data-test='${val}']`);

describe("SIGN-UP COMPONENT", () => {
  it("SHOULD REDNER SIGN-UP COMPONENT", () => {
    const signUpComponent = findByTestAttr(shallowSetup, "component-sign-up");
    expect(signUpComponent.length).toBe(1);
  });
});
