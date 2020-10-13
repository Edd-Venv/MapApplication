import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import App from "../../App";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Layout from "../../containers/Layout/Layout";
import MyLocation from "../Pages/MyLocations/MyLocations";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the DrawerToggle Component
 * @function shallowSetup
 * @returns {ShallowWrapper}
 */
const shallowSetup = () => shallow(<MyLocation />);
const mountSetUp = () => mount(<App />);

describe("MY-LOCATIONS COMPONENT", () => {
  it("SHOULD RENDER MY-LOCATIONS", () => {
    const findByTestAttr = (wrapper, val) =>
      wrapper().find(`[data-test='${val}']`);
    const myLocationsComponent = findByTestAttr(
      shallowSetup,
      "component-my-locations"
    );
    expect(myLocationsComponent.length).toBe(1);
  });
  /*it("SHOULD ONLY RENDER LOCATIONS COMPONENT WHEN MY-LOCATIONS LINK IS CLICKED", () => {
    const findByTestAttr = (wrapper, val) =>
      wrapper().find(`[data-test='${val}']`);
    const appComponent = findByTestAttr(mountSetUp, "component-app");
    console.log(
      "BEFORE",
      appComponent.html()
      //.find('[data-test="layout-main-tag"]').children().debug()
    );

    const myLocationsLink = appComponent
      .find('[data-test="my-locations-link"]')
      .first();
    myLocationsLink.find("a").simulate("click");
    console.log(
      "AFTER",
      appComponent.html()
      //.find('[data-test="layout-main-tag"]').children().debug()
    );
    //const mylocationLink = findByTestAttr(layoutComponent, "my-locations-link");
    //console.log(mylocationLink.debug());
  });*/
});
