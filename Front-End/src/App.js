/* eslint-disable sort-imports */
import React from "react";
import Cockpit from "./containers/Map/Cockpit";
import Layout from "./containers/Layout/Layout";
import SignIn from "./components/Pages/SignIn/SignIn";
import SignUp from "./components/Pages/SignUp/SignUp";
import MyLocations from "./components/Pages/MyLocations/MyLocations";
import { Route } from "react-router-dom";

function App() {
  return (
    <div data-test="component-app">
      <Layout>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/mylocations" exact component={MyLocations} />
        <Route path="/" exact component={Cockpit} />
      </Layout>
    </div>
  );
}

export default App;
