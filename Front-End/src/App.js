/* eslint-disable sort-imports */
import React from "react";
import Classes from "./App.module.css";
import Cockpit from "./components/Map/Cockpit";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className={Classes.App}>
      <Layout>
        <Cockpit />
      </Layout>
    </div>
  );
}

export default App;
