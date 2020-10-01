/* eslint-disable sort-imports */
import React from "react";
import Cockpit from "./containers/Map/Cockpit";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div>
      <Layout>
        <Cockpit />
      </Layout>
    </div>
  );
}

export default App;
