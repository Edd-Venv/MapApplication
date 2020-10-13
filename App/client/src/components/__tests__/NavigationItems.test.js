import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the DrawerToggle Component
 * @function shallowSetup
 * @returns {ShallowWrapper}
 */
const shallowSetup = () => shallow(<NavigationItems />);

const findByTestAttr = (wrapper, val) => wrapper().find(`[data-test='${val}']`);

describe("NAVIGATION-ITEMS COMPONENT", () => {
  it("SHOULD REDNER NAVIGATION-ITEMS", () => {
    const navigationItemsComponent = findByTestAttr(
      shallowSetup,
      "component-navigation-items"
    );
    expect(navigationItemsComponent.length).toBe(1);
  });
});
